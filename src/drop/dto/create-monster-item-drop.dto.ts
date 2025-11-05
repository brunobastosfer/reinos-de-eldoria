import { IsIn, IsNumber, IsString } from 'class-validator';

export class CreateMonsterItemDropDto {
  @IsString()
  monsterDropId: string;

  @IsString()
  itemId: string;

  @IsString()
  @IsIn(['COMUM', 'INCOMUM', 'RARO', 'EPIC', 'LENDARY'])
  rarity: 'COMUM' | 'INCOMUM' | 'RARO' | 'EPIC' | 'LENDARY';

  @IsNumber()
  baseChance: number;
}
