import { Injectable } from '@nestjs/common';
import { CharacterEquipmentRepository } from './repository/character-equipment.repository ';
import { CharacterRepository } from './repository/character.repository';
import { ItemInstance } from 'src/item/entities/item-instance.entity';
import { ItemTemplate } from 'src/item/entities/item-template.entity';

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
      const t: ItemTemplate = inst.template;

      totalDefense += t.defense ?? 0;
      totalLife += t.life ?? 0;
      totalMana += t.mana ?? 0;
      totalAgility += t.agility ?? 0;
      totalDodge += t.dodgeChance ?? 0;

      attackSword += t.attack ?? 0;
      attackMagic += t.magic ?? 0;
      attackDistance += t.critChance ?? 0;
    }

    await this.characterRepo.update(characterId, {
      defense: totalDefense,
      life: totalLife,
      mana: totalMana,
      magic: attackMagic,
      damage: attackSword + attackDistance,
    });
  }
}
