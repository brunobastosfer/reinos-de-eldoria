import { ClasseType, RarityType } from '@prisma/client';
import { IsIn, IsInt, IsString } from 'class-validator';

export class ItemCreateDto {
  @IsString()
  name: string;

  @IsString()
  description?: string;

  @IsInt()
  attack?: number;

  @IsInt()
  defense?: number;

  @IsString()
  @IsIn(['COMUM', 'INCOMUM', 'RARO', 'EPIC', 'LENDARY'])
  rarity: RarityType;

  @IsString()
  @IsIn(['KNIGHT', 'MAGE', 'HEALER', 'ARCHER'])
  vocation: ClasseType;
}
