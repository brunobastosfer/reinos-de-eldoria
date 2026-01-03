// src/inventory/repository/inventory-prisma.repository.ts

import { Injectable } from '@nestjs/common';
import { CreateInventoryDto } from 'src/inventory/dto/create-inventory.dto';
import { UpdateInventoryDto } from 'src/inventory/dto/update-inventory.dto';
import { Inventario } from 'src/inventory/entities/inventory.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { InventoryRepository } from '../inventory.repository';
import { ItemStock } from 'src/item/entities/item-stock.entity';
import { ItemInstance } from 'src/item/entities/item-instance.entity';
import { ConsumItemStackDto } from 'src/inventory/dto/consum-item-stock.dto';

@Injectable()
export class InventoryPrismaRepository implements InventoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  // ============================================================
  // INVENTÁRIO
  // ============================================================
  async create(data: CreateInventoryDto): Promise<Inventario> {
    return this.prisma.inventory.create({
      data: {
        characterId: data.characterId,
        extraSlots: data.extraSlots ?? 0,
      },
    });
  }

  async findByCharacterId(characterId: string): Promise<Inventario | null> {
    return this.prisma.inventory.findUnique({
      where: { characterId },
      include: {
        stacks: true,
        instances: true,
      },
    });
  }

  async updateInventory(
    id: string,
    data: UpdateInventoryDto,
  ): Promise<Inventario> {
    return this.prisma.inventory.update({
      where: { id },
      data,
    });
  }

  // ============================================================
  // SLOTS
  // ============================================================
  async countUsedSlots(inventoryId: string): Promise<number> {
    const [instances, stacks] = await Promise.all([
      this.prisma.itemInstance.count({ where: { inventoryId } }),
      this.prisma.itemStack.count({ where: { inventoryId } }),
    ]);

    return instances + stacks;
  }

  // ============================================================
  // STACK
  // ============================================================
  async findStack(
    inventoryId: string,
    templateId: string,
  ): Promise<ItemStock | null> {
    return this.prisma.itemStack.findFirst({
      where: { inventoryId, templateId },
    });
  }

  async createStack(
    inventoryId: string,
    templateId: string,
  ): Promise<ItemStock> {
    return this.prisma.itemStack.create({
      data: {
        inventoryId,
        templateId,
        quantity: 1,
      },
    });
  }

  async updateStackQuantity(id: string, quantity: number): Promise<ItemStock> {
    return this.prisma.itemStack.update({
      where: { id },
      data: { quantity },
    });
  }

  async deleteStack(id: string): Promise<void> {
    await this.prisma.itemStack.delete({
      where: { id },
    });
  }

  // ============================================================
  // INSTÂNCIA
  // ============================================================
  async createInstance(
    inventoryId: string,
    templateId: string,
    createdFrom?: string,
  ): Promise<ItemInstance> {
    const template = await this.prisma.item.findUnique({
      where: { id: templateId },
    });

    if (!template) {
      throw new Error('Template de item não encontrado.');
    }

    return this.prisma.itemInstance.create({
      data: {
        inventoryId,
        templateId,
        rarity: template.rarity, // OBRIGATÓRIO
        level: 1, // default
        durability: 100, // exemplo / pode ser null
        attackBonus: 0,
        serial: crypto.randomUUID(),
        createdFrom: createdFrom ?? null,
      },
    });
  }

  // ============================================================
  // EXPANSÃO
  // ============================================================
  async incrementInventorySlots(
    inventoryId: string,
    extraSlots: number,
  ): Promise<Inventario> {
    const inventory = await this.prisma.inventory.findUnique({
      where: { id: inventoryId },
    });

    if (!inventory) {
      throw new Error('Inventário não encontrado.');
    }

    return this.prisma.inventory.update({
      where: { id: inventoryId },
      data: { extraSlots: (inventory.extraSlots ?? 0) + extraSlots },
    });
  }

  // ============================================================
  // CONSUMO DE PILHA
  // ============================================================
  async consumeStack(data: ConsumItemStackDto): Promise<ItemStock | null> {
    const stack = await this.prisma.itemStack.findFirst({
      where: {
        inventory: { characterId: data.characterId },
        templateId: data.templateId,
      },
    });

    if (!stack) return null;

    const newQuantity = stack.quantity - data.quantity;

    if (newQuantity <= 0) {
      await this.deleteStack(stack.id);
      return null;
    }

    return this.updateStackQuantity(stack.id, newQuantity);
  }
}
