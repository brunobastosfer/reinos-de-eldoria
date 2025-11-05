import { IsInt, IsOptional, IsString } from 'class-validator';

export class MonsterCreateDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  lvl: number;

  @IsInt()
  defense: number;

  @IsInt()
  damage: number;

  @IsInt()
  experience: number;
}
