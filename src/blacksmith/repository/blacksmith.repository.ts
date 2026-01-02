export abstract class BlacksmithRepository {
  abstract createRarityAttempt(data: {
    itemInstanceId: string;
    fromRarity: string;
    toRarity: string;
    success: boolean;
    usedStoneId?: string;
  }): Promise<any>;
}
