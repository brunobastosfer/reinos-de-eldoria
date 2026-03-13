import { BadRequestException, Injectable } from '@nestjs/common';
import { StartManualBattleDto } from './dto/start-manual-battle.dto';
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
    } else {
      battle = await this.battleRepository.create({
        characterId: character.id,
        monsterId: monster.id,
        characterCurrentLife: character.life,
        characterMaxLife: character.life,
        monsterCurrentLife: monster.life,
        monsterMaxLife: monster.life,
      });
    }

    const equipment =
      await this.characterEquipmentService.findByCharacterIdFull(character.id);

    const weapon = equipment?.weapon;
    const weaponAttack = weapon?.template?.attack ?? 0;

    const skillProgress = character.skillProgress;
    const skillLevel = skillProgress?.level ?? 0;

    let hitChance =
      0.6 + skillLevel * 0.015 + character.lvl * 0.01 - monster.dodge * 0.02;

    hitChance = Math.min(Math.max(hitChance, 0.1), 0.95);

    const hit = Math.random() < hitChance;

    await this.skillService.registerAttack({
      character,
      monster,
      hit,
    });

    if (!hit) {
      return {
        hit: false,
        message: `${character.nickname} errou o ataque!`,
        playerLifeRemaining: battle.characterCurrentLife,
        monsterLifeRemaining: battle.monsterCurrentLife,
      };
    }

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
    const finalDamage = Math.max(r1, r2);

    const remainingLife = Math.max(battle.monsterCurrentLife - finalDamage, 0);

    await this.battleRepository.updateState({
      battleId: battle.id,
      monsterCurrentLife: remainingLife,
    });

    if (remainingLife <= 0) {
      await this.battleRepository.finishBattle({
        battleId: battle.id,
        winner: 'CHARACTER',
      });

      const result = await this.monsterService.monsterDefeat({
        characterId: character.id,
        monsterId: monster.id,
      });

      return {
        hit: true,
        finalDamage,
        monsterDefeated: true,
        drops: result.itemsDropped,
        gold: result.goldDropped,
        playerLifeRemaining: battle.characterCurrentLife,
        monsterLifeRemaining: 0,
        message: `Você matou o ${monster.name}!`,
      };
    }

    return {
      hit: true,
      finalDamage,
      playerLifeRemaining: battle.characterCurrentLife,
      monsterLifeRemaining: remainingLife,
      message: `Você causou ${finalDamage} de dano ao ${monster.name}.`,
    };
  }

  private random(min: number, max: number) {
    if (max <= min) return min;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
