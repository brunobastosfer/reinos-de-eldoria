// src/drop/dto/create-drop-log.dto.ts
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

/**
 * DTO para criar um registro de drop (DropLog).
 * Ajustado para contemplar os campos do schema Prisma:
 * - itemTemplateIds: string[]  (templates que participaram do roll)
 * - itemInstanceIds: string[]  (ids de instâncias criadas)
 */
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

  // NOVOS CAMPOS
  @IsArray()
  itemTemplateIds: string[];

  @IsArray()
  itemInstanceIds: string[];
}
