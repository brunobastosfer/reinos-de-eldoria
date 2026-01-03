export abstract class BattleRepository {
  abstract findActive(
    characterId: string,
    monsterId: string,
  ): Promise<{
    id: string;
    currentLife: number;
  } | null>;

  abstract create(data: {
    characterId: string;
    monsterId: string;
    currentLife: number;
  }): Promise<{
    id: string;
    currentLife: number;
  }>;

  abstract updateLife(
    battleId: string,
    currentLife: number,
  ): Promise<void>;

  abstract finishBattle(battleId: string): Promise<void>;
}
