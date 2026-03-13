import { ClasseType, ItemType, ItemRarity } from '@prisma/client';
import { IsBoolean, IsIn, IsInt, IsOptional, IsString } from 'class-validator';

export class ItemCreateDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsInt()
  @IsOptional()
  attack?: number;

  @IsInt()
  @IsOptional()
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

  @IsInt()
  @IsOptional()
  requiredLevel: number;

  @IsInt()
  @IsOptional()
  critChance: number;

  @IsInt()
  @IsOptional()
  dodgeChance: number;

  @IsInt()
  @IsOptional()
  agility: number;

  @IsBoolean()
  @IsOptional()
  canGiveLife: boolean;

  @IsBoolean()
  @IsOptional()
  canGiveMana: boolean;

  @IsBoolean()
  @IsOptional()
  canGiveMagic: boolean;

  @IsString()
  @IsOptional()
  stackCategory: string;

  @IsInt()
  @IsOptional()
  stackable: boolean;

  @IsInt()
  @IsOptional()
  craftable: boolean;

  @IsInt()
  @IsOptional()
  price: number;

  @IsInt()
  @IsOptional()
  sellPrice: number;
}
