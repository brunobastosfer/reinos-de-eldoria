import { IsIn, IsNumber, IsString } from 'class-validator';

export class CreateMonsterItemDropDto {
  @IsString()
  monsterDropId: string;

  @IsString()
  itemId: string;

  @IsString()
  @IsIn(['COMMON', 'UNCOMMON', 'RARE', 'EPIC', 'LEGENDARY'])
  rarity: 'COMMON' | 'UNCOMMON' | 'RARE' | 'EPIC' | 'LEGENDARY';

  @IsNumber()
  baseChance: number;
}
