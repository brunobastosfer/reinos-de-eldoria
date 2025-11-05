export class DropLog {
  id: string;
  goldDropped: number;
  luckApplied: number;
  playerId: string;
  monsterId: string;
  itemId: string | null;
  characterId: string | null;
  itemsDropped?: string[];
  createdAt: Date;
}
