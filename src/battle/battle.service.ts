import { BadRequestException, Injectable } from '@nestjs/common';
import { StartManualBattleDto } from './dto/start-manual-battle.dto';
import { BattleActionDto } from './dto/battle-action.dto';
import { CharacterService } from 'src/character/character.service';
import { MonsterService } from 'src/monster/monster.service';
import { CharacterEquipmentService } from 'src/character/character-equipment.service';
import { BattleRepository } from './repository/battleRepository';
import { SkillService } from 'src/skill/skill.service';

@Injectable()
export class BattleService {
  constructor(
    private readonly characterService: CharacterService,
    private readonly monsterService: MonsterService,
    private readonly characterEquipmentService: CharacterEquipmentService,
    private readonly battleRepository: BattleRepository,
    private readonly skillService: SkillService,
  ) {}

  async startManualBattle(dto: StartManualBattleDto) {
    const character = await this.characterService.findById(dto.characterId);
    if (!character) {
      throw new BadRequestException('Personagem não encontrado.');
    }

    const monster = await this.monsterService.findById(dto.monsterId);
    if (!monster) {
      throw new BadRequestException('Monstro não encontrado.');
    }

    let battle = await this.battleRepository.findActiveByCharacter(
      character.id,
    );

    if (battle) {
      if (battle.monsterId !== monster.id) {
        throw new BadRequestException(
          'Você já está em uma batalha ativa com outro monstro.',
        );
      }

      return {
        message: 'Batalha já iniciada.',
        battle,
      };
    }

    battle = await this.battleRepository.create({
      characterId: character.id,
      monsterId: monster.id,
      characterCurrentLife: character.life,
      characterMaxLife: character.life,
      monsterCurrentLife: monster.life,
      monsterMaxLife: monster.life,
    });

    return {
      message: `Batalha iniciada contra ${monster.name}.`,
      battle,
    };
  }

  async executeAction(dto: BattleActionDto) {
    const battle = await this.battleRepository.findActiveByCharacter(
      dto.characterId,
    );

    if (!battle) {
      throw new BadRequestException('Nenhuma batalha ativa encontrada.');
    }

    const character = await this.characterService.findById(battle.characterId);
    if (!character) {
      throw new BadRequestException('Personagem não encontrado.');
    }

    const monster = await this.monsterService.findById(battle.monsterId);
    if (!monster) {
      throw new BadRequestException('Monstro não encontrado.');
    }

    if (battle.characterCurrentLife <= 0) {
      throw new BadRequestException('O personagem está morto.');
    }

    if (battle.monsterCurrentLife <= 0) {
      throw new BadRequestException('O monstro já foi derrotado.');
    }

    if (dto.action === 'ATTACK') {
      return this.attackTurn({ battle, character, monster });
    }

    if (dto.action === 'FLEE') {
      return this.tryFlee({ battle, character, monster });
    }

    throw new BadRequestException('Ação inválida.');
  }

  async getActiveBattle(characterId: string) {
    const battle =
      await this.battleRepository.findActiveByCharacter(characterId);

    if (!battle) {
      return {
        inBattle: false,
        message: 'O usuário não está em nenhuma batalha',
      };
    }

    const monster = await this.monsterService.findById(battle.monsterId);

    return {
      ...battle,
      inBattle: false,
      monster: monster
        ? {
            id: monster.id,
            name: monster.name,
            life: monster.life,
            lvl: monster.lvl,
            damage: monster.damage,
            defense: monster.defense,
            dodge: monster.dodge,
          }
        : null,
    };
  }

  private async attackTurn({
    battle,
    character,
    monster,
  }: {
    battle: {
      id: string;
      characterId: string;
      monsterId: string;
      characterCurrentLife: number;
      characterMaxLife: number;
      monsterCurrentLife: number;
      monsterMaxLife: number;
      fleeAttempted: boolean;
      fleeLocked: boolean;
    };
    character: any;
    monster: any;
  }) {
    const equipment =
      await this.characterEquipmentService.findByCharacterIdFull(character.id);

    const weapon = equipment?.weapon;
    const weaponAttack = weapon?.template?.attack ?? 0;

    const skillProgress =
      character.skillCharacterProgress ?? character.skillProgress;
    const skillLevel = skillProgress?.level ?? 0;

    let playerHitChance =
      0.6 + skillLevel * 0.015 + character.lvl * 0.01 - monster.dodge * 0.02;

    playerHitChance = Math.min(Math.max(playerHitChance, 0.1), 0.95);

    const playerHit = Math.random() < playerHitChance;

    const skillResult = await this.skillService.registerAttack({
      character,
      monster,
      hit: playerHit,
    });

    const logs: string[] = [];
    let monsterLifeRemaining = battle.monsterCurrentLife;
    let playerLifeRemaining = battle.characterCurrentLife;
    let finalDamage = 0;

    if (!playerHit) {
      logs.push(`${character.nickname} errou o ataque!`);
    } else {
      let rawDamage =
        character.damage +
        weaponAttack +
        Math.floor(skillLevel * 0.6) +
        Math.floor(character.lvl * 0.4);

      rawDamage = Math.max(rawDamage - monster.defense, 0);

      const minHit = Math.floor(rawDamage * 0.3);
      const maxHit = rawDamage;

      const r1 = this.random(minHit, maxHit);
      const r2 = this.random(minHit, maxHit);
      finalDamage = Math.max(r1, r2);

      monsterLifeRemaining = Math.max(
        battle.monsterCurrentLife - finalDamage,
        0,
      );

      await this.battleRepository.updateState({
        battleId: battle.id,
        monsterCurrentLife: monsterLifeRemaining,
      });

      logs.push(
        `${character.nickname} causou ${finalDamage} de dano ao ${monster.name}.`,
      );
    }

    if (skillResult.leveledUp) {
      logs.push(
        `${character.nickname} evoluiu a skill de nível ${skillResult.previousLevel} para ${skillResult.currentLevel}.`,
      );
    }

    if (monsterLifeRemaining <= 0) {
      await this.battleRepository.finishBattle({
        battleId: battle.id,
        winner: 'CHARACTER',
      });

      const result = await this.monsterService.monsterDefeat({
        characterId: character.id,
        monsterId: monster.id,
      });

      logs.push(`Você matou o ${monster.name}!`);

      return {
        action: 'ATTACK',
        hit: playerHit,
        finalDamage,
        monsterDefeated: true,
        playerDefeated: false,
        drops: result.itemsDropped,
        gold: result.goldDropped,
        playerLifeRemaining,
        monsterLifeRemaining: 0,
        skill: {
          leveledUp: skillResult.leveledUp,
          previousLevel: skillResult.previousLevel,
          currentLevel: skillResult.currentLevel,
          experience: skillResult.experience,
          toNextLevel: skillResult.toNextLevel,
        },
        message: logs.join(' '),
        logs,
      };
    }

    const monsterAttackResult = await this.monsterAttack({
      battleId: battle.id,
      battleCharacterCurrentLife: playerLifeRemaining,
      character,
      monster,
    });

    playerLifeRemaining = monsterAttackResult.playerLifeRemaining;
    logs.push(monsterAttackResult.message);

    if (monsterAttackResult.playerDefeated) {
      await this.battleRepository.finishBattle({
        battleId: battle.id,
        winner: 'MONSTER',
      });

      logs.push(`${character.nickname} foi derrotado por ${monster.name}.`);
    }

    return {
      action: 'ATTACK',
      hit: playerHit,
      finalDamage,
      monsterHit: monsterAttackResult.hit,
      monsterDamage: monsterAttackResult.damage,
      monsterDefeated: false,
      playerDefeated: monsterAttackResult.playerDefeated,
      playerLifeRemaining,
      monsterLifeRemaining,
      skill: {
        leveledUp: skillResult.leveledUp,
        previousLevel: skillResult.previousLevel,
        currentLevel: skillResult.currentLevel,
        experience: skillResult.experience,
        toNextLevel: skillResult.toNextLevel,
      },
      message: logs.join(' '),
      logs,
    };
  }

  private async tryFlee({
    battle,
    character,
    monster,
  }: {
    battle: {
      id: string;
      characterId: string;
      monsterId: string;
      characterCurrentLife: number;
      characterMaxLife: number;
      monsterCurrentLife: number;
      monsterMaxLife: number;
      fleeAttempted: boolean;
      fleeLocked: boolean;
    };
    character: any;
    monster: any;
  }) {
    if (battle.fleeLocked) {
      return {
        action: 'FLEE',
        fled: false,
        locked: true,
        playerLifeRemaining: battle.characterCurrentLife,
        monsterLifeRemaining: battle.monsterCurrentLife,
        message:
          'Você já tentou fugir e falhou miseravelmente. Agora terá que lutar até o fim.',
        logs: [
          'Você já tentou fugir e falhou miseravelmente. Agora terá que lutar até o fim.',
        ],
      };
    }

    const fleeChance = this.getFleeChance(character, monster);
    const fled = Math.random() < fleeChance;

    if (fled) {
      await this.battleRepository.finishBattle({
        battleId: battle.id,
        winner: 'FLEE',
      });

      return {
        action: 'FLEE',
        fled: true,
        locked: false,
        playerLifeRemaining: battle.characterCurrentLife,
        monsterLifeRemaining: battle.monsterCurrentLife,
        message: `${character.nickname} conseguiu fugir da batalha.`,
        logs: [`${character.nickname} conseguiu fugir da batalha.`],
      };
    }

    await this.battleRepository.updateState({
      battleId: battle.id,
      fleeAttempted: true,
      fleeLocked: true,
    });

    const logs = [
      `${character.nickname} tentou fugir e falhou miseravelmente.`,
    ];

    const monsterAttackResult = await this.monsterAttack({
      battleId: battle.id,
      battleCharacterCurrentLife: battle.characterCurrentLife,
      character,
      monster,
    });

    logs.push(monsterAttackResult.message);

    if (monsterAttackResult.playerDefeated) {
      await this.battleRepository.finishBattle({
        battleId: battle.id,
        winner: 'MONSTER',
      });

      logs.push(`${character.nickname} foi derrotado por ${monster.name}.`);
    }

    return {
      action: 'FLEE',
      fled: false,
      locked: true,
      monsterHit: monsterAttackResult.hit,
      monsterDamage: monsterAttackResult.damage,
      playerDefeated: monsterAttackResult.playerDefeated,
      playerLifeRemaining: monsterAttackResult.playerLifeRemaining,
      monsterLifeRemaining: battle.monsterCurrentLife,
      message: logs.join(' '),
      logs,
    };
  }

  private async monsterAttack({
    battleId,
    battleCharacterCurrentLife,
    character,
    monster,
  }: {
    battleId: string;
    battleCharacterCurrentLife: number;
    character: any;
    monster: any;
  }): Promise<{
    hit: boolean;
    damage: number;
    playerLifeRemaining: number;
    playerDefeated: boolean;
    message: string;
  }> {
    let monsterHitChance =
      0.65 + monster.lvl * 0.01 - (character.dodge ?? 0) * 0.02;

    monsterHitChance = Math.min(Math.max(monsterHitChance, 0.1), 0.95);

    const hit = Math.random() < monsterHitChance;

    if (!hit) {
      return {
        hit: false,
        damage: 0,
        playerLifeRemaining: battleCharacterCurrentLife,
        playerDefeated: false,
        message: `${monster.name} errou o ataque!`,
      };
    }

    let rawDamage =
      Math.floor(monster.damage * 1.0) +
      Math.floor(monster.lvl * 0.4) -
      (character.defense ?? 0);

    rawDamage = Math.max(rawDamage, 0);

    const minHit = Math.floor(rawDamage * 0.3);
    const maxHit = rawDamage;

    const r1 = this.random(minHit, maxHit);
    const r2 = this.random(minHit, maxHit);
    const damage = Math.max(r1, r2);

    const playerLifeRemaining = Math.max(
      battleCharacterCurrentLife - damage,
      0,
    );

    await this.battleRepository.updateState({
      battleId,
      characterCurrentLife: playerLifeRemaining,
    });

    return {
      hit: true,
      damage,
      playerLifeRemaining,
      playerDefeated: playerLifeRemaining <= 0,
      message: `${monster.name} causou ${damage} de dano em ${character.nickname}.`,
    };
  }

  private getFleeChance(character: any, monster: any) {
    const characterAgility = character.agility ?? 0;
    const monsterAgility = monster.agility ?? 0;

    let fleeChance = 0.35 + characterAgility * 0.02 - monsterAgility * 0.015;
    fleeChance = Math.min(Math.max(fleeChance, 0.05), 0.75);

    return fleeChance;
  }

  private random(min: number, max: number) {
    if (max <= min) return min;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
