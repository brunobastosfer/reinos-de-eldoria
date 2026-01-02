// src/character-equipment/entities/character-equipment.entity.ts

export class CharacterEquipment {
  id: string;
  characterId: string;

  // ItemInstance IDs (cada slot referencia um item equipado)
  weaponId?: string | null;
  shieldId?: string | null;
  helmetId?: string | null;
  armorId?: string | null;
  legId?: string | null;
  amuletId?: string | null;
  ring1Id?: string | null;
  ring2Id?: string | null;
  bootId?: string | null;

  // Optional loaded ItemInstances (quando usar include no Prisma)
  weapon?: any | null;
  shield?: any | null;
  helmet?: any | null;
  armor?: any | null;
  leg?: any | null;
  amulet?: any | null;
  ring1?: any | null;
  ring2?: any | null;
  boot?: any | null;

  createdAt: Date;
  updatedAt: Date;
}
