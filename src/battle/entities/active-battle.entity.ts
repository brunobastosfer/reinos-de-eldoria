export interface ActiveBattleEntity {
  id: string;
  characterId: string;
  monsterId: string;
  characterCurrentLife: number;
  characterMaxLife: number;
  monsterCurrentLife: number;
  monsterMaxLife: number;
  fleeAttempted: boolean;
  fleeLocked: boolean;
}
