import { Injectable } from '@nestjs/common';
import { CharacterRepository } from './repository/character.repository';
import { ItemInstance } from 'src/item/entities/item-instance.entity';
import { CharacterEquipmentRepository } from './repository/character-equipment.repository ';

@Injectable()
export class CharacterStatsService {
  constructor(
    private readonly equipmentRepo: CharacterEquipmentRepository,
    private readonly characterRepo: CharacterRepository,
  ) {}

  async recalcCharacterAttributes(characterId: string) {
    const equipment =
      await this.equipmentRepo.findByCharacterIdFull(characterId);

    if (!equipment) return;

    const equippedItems: ItemInstance[] = [
      equipment.weapon,
      equipment.shield,
      equipment.helmet,
      equipment.armor,
      equipment.leg,
      equipment.boot,
      equipment.amulet,
      equipment.ring1,
      equipment.ring2,
    ].filter((i): i is ItemInstance => Boolean(i));

    let totalDefense = 0;
    let totalLife = 0;
    let totalMana = 0;

    let totalAgility = 0;
    let totalDodge = 0;

    let attackSword = 0;
    let attackMagic = 0;
    let attackDistance = 0;

    for (const inst of equippedItems) {
      const template = inst.template;
      if (!template) continue;

      // ===== DEFESA / VIDA / MANA =====
      totalDefense += (template.defense ?? 0) + (inst.defenseBonus ?? 0);
      totalLife += inst.lifeBonus ?? 0;
      totalMana += inst.manaBonus ?? 0;

      // ===== ATRIBUTOS =====
      totalAgility += template.agility ?? 0;
      totalDodge += template.dodgeChance ?? 0;

      // ===== ATAQUE =====
      attackSword += (template.attack ?? 0) + (inst.attackBonus ?? 0);
      attackMagic += inst.magicBonus ?? 0;
      attackDistance += template.critChance ?? 0; // distância pode usar crit
    }

    await this.characterRepo.updateStats(characterId, {
      defense: totalDefense,
      life: totalLife,
      mana: totalMana,
      magic: attackMagic,
      damage: attackSword + attackDistance,
    });
  }
}
