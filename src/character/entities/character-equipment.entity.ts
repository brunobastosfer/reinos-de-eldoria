// src/character-equipment/entities/character-equipment.entity.ts
import { ItemInstance } from 'src/item/entities/item-instance.entity';

export class CharacterEquipment {
  id: string;
  characterId: string;

  weaponId?: string | null;
  shieldId?: string | null;
  helmetId?: string | null;
  armorId?: string | null;
  legId?: string | null;
  amuletId?: string | null;
  ring1Id?: string | null;
  ring2Id?: string | null;
  bootId?: string | null;

  weapon?: ItemInstance | null;
  shield?: ItemInstance | null;
  helmet?: ItemInstance | null;
  armor?: ItemInstance | null;
  leg?: ItemInstance | null;
  amulet?: ItemInstance | null;
  ring1?: ItemInstance | null;
  ring2?: ItemInstance | null;
  boot?: ItemInstance | null;

  createdAt: Date;
  updatedAt: Date;
}
