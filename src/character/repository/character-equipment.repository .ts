import { ItemInstance } from 'src/item/entities/item-instance.entity';
import { CharacterEquipment } from '../entities/character-equipment.entity';

export abstract class CharacterEquipmentRepository {
  abstract findByCharacterId(
    characterId: string,
  ): Promise<CharacterEquipment | null>;

  abstract findByCharacterIdFull(
    characterId: string,
  ): Promise<CharacterEquipment | null>;

  // Equipar um item em um slot
  abstract setSlot(
    characterId: string,
    slot: string,
    itemInstanceId: string | null,
  ): Promise<void>;

  // Remover item de um slot
  abstract clearSlot(characterId: string, slot: string): Promise<void>;

  abstract createEmptyEquipment(
    characterId: string,
  ): Promise<CharacterEquipment>;

  abstract findInstanceInInventory(
    characterId: string,
    instanceId: string,
  ): Promise<ItemInstance | null>;

  abstract returnToInventory(
    characterId: string,
    instanceId: string,
  ): Promise<void>;

  abstract findEquipmentByCharacterId(id: string): Promise<CharacterEquipment | null>
}
