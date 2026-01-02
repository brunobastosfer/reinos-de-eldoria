import { BadRequestException, Injectable } from '@nestjs/common';
import { StartManualBattleDto } from './dto/start-manual-battle.dto';
import { CharacterService } from 'src/character/character.service';
import { MonsterService } from 'src/monster/monster.service';

@Injectable()
export class BattleService {
  constructor(
    private readonly characterService: CharacterService,
    private readonly monsterService: MonsterService,
  ) {}
  async startManualBattle(dto: StartManualBattleDto) {
    // 1) Buscar personagem
    const character = await this.characterService.findById(dto.characterId);

    if (!character) {
      throw new BadRequestException('Personagem não encontrado.');
    }

    // 2) Buscar monstro
    const monster = await this.monsterService.findById(dto.monsterId);

    if (!monster) {
      throw new BadRequestException('Monstro não encontrado.');
    }

    // --- Cálculo de Dano ---

    // 3) Buscar arma equipada (simples: primeiro item com itemType WEAPON)
    const weapon = character.items?.find((i) => i.item.itemType === 'WEAPON');

    const weaponDamage = weapon?.item?.attack ?? 0;

    // 4) Dano base do personagem
    const baseDamage = character.damage;

    // 5) Skill do personagem (DISTANCE, MAGIC, SWORD)
    const skillValue = character.skillProgress?.level ?? 0;

    // 6) Dano bruto
    let rawDamage = baseDamage + weaponDamage + skillValue;

    // 7) Reduzir pela defesa do monstro
    rawDamage = Math.max(rawDamage - monster.defense, 0);

    // 8) Intervalo mínimo e máximo
    const minHit = Math.floor(rawDamage * 0.3);
    const maxHit = rawDamage;

    // 9) Sorteio tibia-like
    const r1 = this.random(minHit, maxHit);
    const r2 = this.random(minHit, maxHit);

    const finalDamage = Math.max(r1, r2);

    return {
      character: character.nickname,
      monster: monster.name,
      weaponDamage,
      baseDamage,
      skillValue,
      rawDamage,
      minHit,
      maxHit,
      roll1: r1,
      roll2: r2,
      finalDamage,
      message: `Você causou ${finalDamage} de dano ao ${monster.name}!`,
    };
  }

  private random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
