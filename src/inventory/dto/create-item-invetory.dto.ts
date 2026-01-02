// src/inventory/dto/create-item-inventory.dto.ts
import { IsString, IsInt, Min, IsOptional } from 'class-validator';

/**
 * DTO usado para inserir item no inventário.
 */
export class CreateItemInventoryDto {
  @IsString()
  characterId: string;

  @IsString()
  templateId: string;

  @IsOptional()
  @IsString()
  createdFrom?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  quantity?: number = 1;
}
