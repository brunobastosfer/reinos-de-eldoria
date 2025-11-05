export class Item {
  id: string;
  name: string;
  description: string | null;
  attack: number | null;
  defense: number | null;
  rarity: 'COMUM' | 'INCOMUM' | 'RARO' | 'EPIC' | 'LENDARY';
  vocation: 'KNIGHT' | 'MAGE' | 'HEALER' | 'ARCHER';
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
