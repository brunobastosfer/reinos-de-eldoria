import { Injectable, BadRequestException } from '@nestjs/common';
import { CharacterRepository } from './repository/character.repository';
import { CharacterStatsService } from './character-stats.service';
import { VALID_SLOTS, EquipmentSlot } from 'utils/validSlots';
import { ItemType } from '@prisma/client';
import { CharacterEquipmentRepository } from './repository/character-equipment.repository ';

@Injectable()
export class CharacterEquipmentService {
  constructor(
    private readonly equipmentRepo: CharacterEquipmentRepository,
    private readonly characterRepo: CharacterRepository,
    private readonly statsService: CharacterStatsService,
  ) {}

  // ✅ NOVO: método FULL (exposto corretamente)
  async findByCharacterIdFull(characterId: string) {
    return this.equipmentRepo.findByCharacterIdFull(characterId);
  }

  async equip(characterId: string, dto: { itemInstanceId: string }) {
    const instance = await this.equipmentRepo.findInstanceInInventory(
      characterId,
      dto.itemInstanceId,
    );

    if (!instance) {
      throw new BadRequestException('Item não está no inventário.');
    }

    const template = instance.template;
    if (!template) {
      throw new BadRequestException('Item inválido.');
    }

    const char = await this.characterRepo.findById(characterId);
    if (!char || !char.classe) {
      throw new BadRequestException('Personagem inválido.');
    }

    // ✔️ Validação de vocação
    if (template.vocation && template.vocation !== char.classe.type) {
      throw new BadRequestException('Vocação não permite equipar este item.');
    }

    const slot = this.mapItemTypeToSlot(template.itemType);

    if (!VALID_SLOTS.includes(slot)) {
      throw new BadRequestException('Slot inválido para este item.');
    }

    await this.equipmentRepo.setSlot(characterId, slot, instance.id);

    await this.statsService.recalcCharacterAttributes(characterId);

    return { message: 'Item equipado com sucesso.' };
  }

  async unequip(characterId: string, dto: { slot: EquipmentSlot }) {
    if (!VALID_SLOTS.includes(dto.slot)) {
      throw new BadRequestException('Slot inválido.');
    }

    const equipment = await this.equipmentRepo.findByCharacterId(characterId);
    if (!equipment) {
      throw new BadRequestException('Personagem não possui equipamento.');
    }

    const instanceId = equipment[dto.slot];
    if (!instanceId) {
      throw new BadRequestException('Não há item equipado neste slot.');
    }

    await this.equipmentRepo.setSlot(characterId, dto.slot, null);
    await this.equipmentRepo.returnToInventory(characterId, instanceId);

    await this.statsService.recalcCharacterAttributes(characterId);

    return { message: 'Item removido com sucesso.' };
  }

  private mapItemTypeToSlot(itemType: ItemType): EquipmentSlot {
    switch (itemType) {
      case ItemType.WEAPON:
        return 'weaponId';
      case ItemType.SHIELD:
        return 'shieldId';
      case ItemType.HELMET:
        return 'helmetId';
      case ItemType.ARMOR:
        return 'armorId';
      case ItemType.LEG:
        return 'legId';
      case ItemType.AMULET:
        return 'amuletId';
      case ItemType.RING:
        return 'ring1Id';
      case ItemType.BOOTS:
        return 'bootId';
      default:
        throw new BadRequestException('Tipo de item não reconhecido.');
    }
  }
}
