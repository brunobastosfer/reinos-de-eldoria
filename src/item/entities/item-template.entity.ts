/**
 * Entidade que representa o template/base de um item.
 *
 * Ex.: “Espada Longa”, “Arco de Caça”, “Amuleto Sagrado”
 *
 * Todas as instâncias (ItemInstance) apontam para um template.
 */
export class ItemTemplate {
  id: string;

  name: string;

  description?: string | null;

  attack?: number | null;

  defense?: number | null;

  rarity: string; // ItemRarity enum

  vocation?: string | null; // ClasseType enum

  itemType: string; // ItemType enum

  critChance?: number | null;

  dodgeChance?: number | null;

  agility?: number | null;

  stackCategory?: string | null;

  stackable: boolean;

  craftable: boolean;

  price?: number | null;

  sellPrice?: number | null;

  createdAt: Date;

  updatedAt: Date;

  deletedAt?: Date | null;
}
