export abstract class CharacterStatsRepository {
  abstract updateCharacterAttributes(
    characterId: string,
    data: {
      life: number;
      mana: number;
      defense: number;
      magic: number;
      damage: number;
      agility: number;
      dodgeChance: number;
    },
  ): Promise<void>;
}
