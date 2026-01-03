// src/inventario/dto/consumir-pilha.dto.ts

import { IsString, IsNumber } from 'class-validator';

/**
 * DTO para consumir (remover) quantidade de uma pilha do inventário.
 * Uso: consumir pedras para forjar, craftar, etc.
 *
 * - characterId: id do personagem
 * - templateId: template do item empilhável
 * - quantity: quantidade a remover
 */
export class ConsumItemStackDto {
  @IsString()
  characterId: string;

  @IsString()
  templateId: string;

  @IsNumber()
  quantity: number;
}
