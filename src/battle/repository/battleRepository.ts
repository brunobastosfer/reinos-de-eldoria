export abstract class BattleRepository {
  abstract findActiveByCharacter(characterId: string): Promise<{
    id: string;
    characterId: string;
    monsterId: string;
    characterCurrentLife: number;
    characterMaxLife: number;
    monsterCurrentLife: number;
    monsterMaxLife: number;
    fleeAttempted: boolean;
    fleeLocked: boolean;
  } | null>;

  abstract create(data: {
    characterId: string;
    monsterId: string;
    characterCurrentLife: number;
    characterMaxLife: number;
    monsterCurrentLife: number;
    monsterMaxLife: number;
  }): Promise<{
    id: string;
    characterId: string;
    monsterId: string;
    characterCurrentLife: number;
    characterMaxLife: number;
    monsterCurrentLife: number;
    monsterMaxLife: number;
    fleeAttempted: boolean;
    fleeLocked: boolean;
  }>;

  abstract updateState(data: {
    battleId: string;
    characterCurrentLife?: number;
    monsterCurrentLife?: number;
    fleeAttempted?: boolean;
    fleeLocked?: boolean;
  }): Promise<void>;

  abstract finishBattle(data: {
    battleId: string;
    winner: 'CHARACTER' | 'MONSTER' | 'FLEE';
  }): Promise<void>;
}
