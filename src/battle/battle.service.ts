import { BadRequestException, Injectable } from '@nestjs/common';
import { StartManualBattleDto } from './dto/start-manual-battle.dto';
import { CharacterService } from 'src/character/character.service';
import { MonsterService } from 'src/monster/monster.service';
import { CharacterEquipmentService } from 'src/character/character-equipment.service';
import { BattleRepository } from './repository/battleRepository';

@Injectable()
export class BattleService {
  constructor(
    private readonly characterService: CharacterService,
    private readonly monsterService: MonsterService,
    private readonly characterEquipmentService: CharacterEquipmentService,
    private readonly battleRepository: BattleRepository
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

    // 🔹 Buscar ou criar estado da batalha
    let battle = await this.battleRepository.findActive(
      character.id,
      monster.id,
    );

    if (!battle) {
      battle = await this.battleRepository.create({
        characterId: character.id,
        monsterId: monster.id,
        currentLife: monster.life, // VIDA TOTAL DO MONSTRO
      });
    }

    // 🔹 Cálculo de dano (SEU código, levemente ajustado)
    const equipment =
      await this.characterEquipmentService.findByCharacterIdFull(character.id);

    const weapon = equipment?.weapon;
    const weaponDamage = weapon?.attackBonus ?? 0;
    const baseDamage = character.damage;
    const skillValue = character.skillProgress?.level ?? 0;

    let rawDamage = baseDamage + weaponDamage + skillValue;
    rawDamage = Math.max(rawDamage - monster.defense, 0);

    const minHit = Math.floor(rawDamage * 0.3);
    const maxHit = rawDamage;

    const r1 = this.random(minHit, maxHit);
    const r2 = this.random(minHit, maxHit);
    const finalDamage = Math.max(r1, r2);

    // 🔹 Subtrair vida
    const remainingLife = Math.max(battle.currentLife - finalDamage, 0);

    await this.battleRepository.updateLife(battle.id, remainingLife);

    // ☠️ MONSTRO MORREU
    if (remainingLife <= 0) {
      await this.battleRepository.finishBattle(battle.id);

      const result = await this.monsterService.monsterDefeat({
        characterId: character.id,
        monsterId: monster.id,
      });

      return {
        finalDamage,
        monsterDefeated: true,
        drops: result.itemsDropped,
        gold: result.goldDropped,
        message: `Você matou o ${monster.name}!`,
      };
    }

    return {
      finalDamage,
      monsterLifeRemaining: remainingLife,
      message: `Você causou ${finalDamage} de dano ao ${monster.name}.`,
    };
  }


  private random(min: number, max: number) {
    if (max <= min) return min;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
