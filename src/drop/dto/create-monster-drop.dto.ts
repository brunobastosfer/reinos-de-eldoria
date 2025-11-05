import { IsNumber, IsString } from 'class-validator';

export class CreateMonsterDropDto {
  @IsNumber()
  minGold: number;

  @IsNumber()
  maxGold: number;

  @IsString()
  itemId: string;

  @IsString()
  monsterId: string;
}
