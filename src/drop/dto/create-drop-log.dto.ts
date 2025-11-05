import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateDropLogDto {
  @IsNumber()
  goldDropped: number;

  @IsNumber()
  luckApplied: number;

  @IsString()
  playerId: string;

  @IsString()
  monsterId: string;

  @IsString()
  @IsOptional()
  itemId?: string;

  @IsString()
  @IsOptional()
  characterId?: string;

  @IsArray()
  itemsDropped: string[];
}
