// src/inventory/dto/create-inventory.dto.ts

import { IsString, IsOptional, IsInt, Min } from 'class-validator';

/**
 * DTO usado para criar o inventário de um personagem.
 */
export class CreateInventoryDto {
  @IsString()
  characterId: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  extraSlots?: number = 0;
}
