import { Injectable, BadRequestException } from '@nestjs/common';
import { CharacterRepository } from './repository/character.repository';
import { CharacterEquipmentRepository } from './repository/character-equipment.repository ';
import { CharacterStatsService } from './character-stats.service';
import { VALID_SLOTS, EquipmentSlot } from 'utils/validSlots';

@Injectable()
export class CharacterEquipmentService {
  constructor(
    private readonly equipmentRepo: CharacterEquipmentRepository,
    private readonly characterRepo: CharacterRepository,
    private readonly statsService: CharacterStatsService,
  ) {}

  async equip(characterId: string, dto: { itemInstanceId: string }) {
    const instance = await this.equipmentRepo.findInstanceInInventory(
      characterId,
      dto.itemInstanceId,
    );

    if (!instance)
      throw new BadRequestException('Item não está no inventário.');

    const template = instance.template;

    let slot: EquipmentSlot | null = null;

    const char = await this.characterRepo.findById(characterId);

    if (template && char?.classe) {
      if (template.vocation && template.vocation !== char.classe.type) {
        throw new BadRequestException('Vocação não permite equipar este item.');
      }

      slot = this.mapItemTypeToSlot(template.itemType);
    }

    if (!slot || !VALID_SLOTS.includes(slot)) {
      throw new BadRequestException('Slot inválido para este item.');
    }

    await this.equipmentRepo.setSlot(characterId, slot, instance.id);

    await this.statsService.recalcCharacterAttributes(characterId);

    return { message: 'Item equipado com sucesso.' };
  }

  async unequip(characterId: string, dto: { slot: EquipmentSlot }) {
    if (!VALID_SLOTS.includes(dto.slot))
      throw new BadRequestException('Slot inválido.');

    const equipment = await this.equipmentRepo.findByCharacterId(characterId);
    if (!equipment)
      throw new BadRequestException('Personagem não possui equipamento.');

    const instanceId = equipment[dto.slot];
    if (!instanceId)
      throw new BadRequestException('Não há item equipado neste slot.');

    await this.equipmentRepo.setSlot(characterId, dto.slot, null);

    await this.equipmentRepo.returnToInventory(characterId, instanceId);

    await this.statsService.recalcCharacterAttributes(characterId);

    return { message: 'Item removido com sucesso.' };
  }

  private mapItemTypeToSlot(itemType: string): EquipmentSlot {
    switch (itemType) {
      case 'WEAPON':
        return 'weaponId';
      case 'SHIELD':
        return 'shieldId';
      case 'HELMET':
        return 'helmetId';
      case 'ARMOR':
        return 'armorId';
      case 'LEG':
        return 'legId';
      case 'AMULET':
        return 'amuletId';
      case 'RING':
        return 'ring1Id';
      case 'BOOT':
        return 'bootId';
      default:
        throw new BadRequestException('Tipo de item não reconhecido.');
    }
  }
}
