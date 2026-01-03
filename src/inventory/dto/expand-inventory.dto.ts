import { IsString, IsNumber } from 'class-validator';

/**
 * DTO para expandir o inventário, consumindo gemas.
 * O serviço tentará remover a gema indicada (1 unidade por operação).
 *
 * - characterId: id do personagem
 * - extraSlots: número de slots que deseja adicionar
 * - gemTemplateId: templateId da gema que será consumida (ex: "gem-slot-common-id")
 */
export class ExpandInventoryDto {
  @IsString()
  characterId: string;

  @IsNumber()
  extraSlots: number;

  @IsString()
  gemTemplateId: string;
}
