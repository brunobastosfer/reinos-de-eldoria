// src/inventory/repository/inventory.repository.ts

import { ItemStock } from 'src/item/entities/item-stock.entity';
import { CreateInventoryDto } from '../dto/create-inventory.dto';
import { Inventario } from '../entities/inventory.entity';
import { UpdateInventoryDto } from '../dto/update-inventory.dto';
import { itemInstance } from 'src/item/entities/item-instance.entity';
import { ConsumItemStackDto } from '../dto/consum-item-stock.dto';

/**
 * Repositório do inventário.
 * Apenas operações de banco.
 * Nenhuma regra de negócio deve estar aqui.
 */
export abstract class InventoryRepository {
  // INVENTÁRIO
  abstract create(data: CreateInventoryDto): Promise<Inventario>;
  abstract findByCharacterId(characterId: string): Promise<Inventario | null>;
  abstract updateInventory(
    id: string,
    data: UpdateInventoryDto,
  ): Promise<Inventario>;

  // SLOTS
  abstract countUsedSlots(inventoryId: string): Promise<number>;

  // STACK
  abstract findStack(
    inventoryId: string,
    templateId: string,
  ): Promise<ItemStock | null>;
  abstract createStack(
    inventoryId: string,
    templateId: string,
  ): Promise<ItemStock>;
  abstract updateStackQuantity(
    id: string,
    quantity: number,
  ): Promise<ItemStock>;
  abstract deleteStack(id: string): Promise<void>;

  // INSTÂNCIA
  abstract createInstance(
    inventoryId: string,
    templateId: string,
    createdFrom?: string,
  ): Promise<itemInstance>;

  // EXPANSÃO
  abstract incrementInventorySlots(
    inventoryId: string,
    extraSlots: number,
  ): Promise<Inventario>;

  // CONSUMO DE PILHA
  abstract consumeStack(data: ConsumItemStackDto): Promise<ItemStock | null>;
}
