export class Item {
  id: string;
  name: string;
  description: string | null;
  attack: number | null;
  defense: number | null;
  rarity: 'COMMON' | 'UNCOMMON' | 'RARE' | 'EPIC' | 'LEGENDARY';
  vocation?: 'KNIGHT' | 'MAGE' | 'HEALER' | 'ARCHER' | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
