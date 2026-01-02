/**
 * Entidade que representa o inventário do personagem.
 * Esta entidade é usada apenas no lado do servidor (DTO/Entity),
 * o Prisma possui o modelo físico em schema.prisma.
 */
export class Inventario {
  id: string;
  characterId: string;
  extraSlots: number;
  createdAt: Date;
  updatedAt: Date;
}
