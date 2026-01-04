import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMonsterDropDto {
  @IsNumber()
  minGold: number;

  @IsNumber()
  maxGold: number;

  @IsString()
  monsterId: string;
}
