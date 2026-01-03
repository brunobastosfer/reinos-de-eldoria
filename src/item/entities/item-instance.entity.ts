import { ItemTemplate } from './item-template.entity';

/**
 * Entidade que representa uma instância de item (não empilhável).
 * Ex.: uma espada única, um amuleto com serial, etc.
 */
export class ItemInstance {
  id: string;
  templateId: string;
  inventoryId?: string | null;

  attackBonus?: number;
  defenseBonus?: number;
  lifeBonus?: number;
  manaBonus?: number;
  magicBonus?: number;

  rarity: string;
  equipped: boolean;

  template?: any;
}
