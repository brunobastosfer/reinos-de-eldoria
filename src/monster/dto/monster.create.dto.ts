import { IsInt, IsOptional, IsString } from 'class-validator';

export class MonsterCreateDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsInt()
  lvl: number;

  @IsInt()
  defense: number;

  @IsInt()
  damage: number;

  @IsInt()
  experience: number;

  @IsInt()
  life: number;

  @IsInt()
  dodge: number;
}
