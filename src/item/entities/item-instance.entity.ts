import { ItemTemplate } from './item-template.entity';

/**
 * Entidade que representa uma instância de item (não empilhável).
 * Ex.: uma espada única, um amuleto com serial, etc.
 */
export class ItemInstance {
  id: string;

  templateId: string;

  template?: ItemTemplate;

  inventoryId?: string | null;

  serial?: string | null;

  boundToAccount: boolean;

  level: number;

  rarity: string;

  attackBonus?: number | null;

  durability?: number | null;

  createdFrom?: string | null;

  createdAt: Date;

  updatedAt: Date;
}
