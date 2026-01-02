export class DropLog {
  id: string;
  goldDropped: number;
  luckApplied: number;
  playerId: string;
  monsterId: string;
  characterId?: string | null;
  itemId?: string | null;
  itemTemplateIds: string[];
  itemInstanceIds: string[];
  createdAt: Date;
}
