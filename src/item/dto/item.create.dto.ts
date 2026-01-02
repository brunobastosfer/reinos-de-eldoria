import { ClasseType, ItemType, ItemRarity } from '@prisma/client';
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
  @IsIn(['COMMON', 'UNCOMMON', 'RARE', 'EPIC', 'LEGENDARY'])
  rarity: ItemRarity;

  @IsString()
  @IsIn(['KNIGHT', 'MAGE', 'HEALER', 'ARCHER'])
  vocation: ClasseType;

  @IsString()
  @IsIn(['LEG', 'ARMOR', 'WEAPON', 'SHIELD', 'HELMET', 'AMULET', 'RING'])
  type: ItemType;
}
