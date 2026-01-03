/**
 * Entidade que representa um item empilhável dentro do inventário.
 * Ex.: iron ore (quantidade), pedra da benção (quantidade).
 *
 * Observação: Um item_pilha é único por (templateId, inventoryId).
 * Ou seja, todas as pilhas do mesmo template no mesmo inventário ficam em uma linha.
 */
export class ItemStock {
  id: string;
  templateId: string;
  inventoryId: string;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
}
