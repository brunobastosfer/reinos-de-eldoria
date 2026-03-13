// src/inventory/inventory.service.ts

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InventoryRepository } from './repository/inventory.repository';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { ExpandInventoryDto } from './dto/expand-inventory.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateItemInventoryDto } from './dto/create-item-invetory.dto';
import { ConsumItemStackDto } from './dto/consum-item-stock.dto';
import { CharacterEquipmentService } from 'src/character/character-equipment.service';
import { EquipItemDto } from './dto/equip-item.dto';

@Injectable()
export class InventoryService {
  constructor(
    private readonly repository: InventoryRepository,
    private readonly prisma: PrismaService,
    private readonly equipmentService: CharacterEquipmentService,
  ) {}

  async createInventory(data: CreateInventoryDto) {
    return this.repository.create(data);
  }

  async getInventory(characterId: string) {
    const inv = await this.repository.findByCharacterId(characterId);

    if (!inv) {
      throw new NotFoundException('O personagem não possui inventário.');
    }

    return inv;
  }

  private async hasSlotAvailable(inventoryId: string, extraSlots: number) {
    const used = await this.repository.countUsedSlots(inventoryId);
    const limit = 25 + (extraSlots ?? 0);
    return used < limit;
  }

  async addItemToInventory(data: CreateItemInventoryDto) {
    const inventory = await this.getInventory(data.characterId);

    const template = await this.prisma.item.findUnique({
      where: { id: data.templateId },
    });

    if (!template)
      throw new BadRequestException('Template do item é inválido.');

    if (template.stackable) {
      const stack = await this.repository.findStack(inventory.id, template.id);

      if (stack) {
        const newQuantity = stack.quantity + 1;

        const updated = await this.repository.updateStackQuantity(
          stack.id,
          newQuantity,
        );

        return {
          stack: updated,
        };
      }

      const hasSlot = await this.hasSlotAvailable(
        inventory.id,
        inventory.extraSlots ?? 0,
      );

      if (!hasSlot) {
        return {
          destroyed: true,
          message: 'O inventário está cheio. Item empilhável destruído.',
        };
      }

      const newStack = await this.repository.createStack(
        inventory.id,
        template.id,
      );

      return { stack: newStack };
    }

    const hasSlot = await this.hasSlotAvailable(
      inventory.id,
      inventory.extraSlots ?? 0,
    );

    if (!hasSlot) {
      return {
        destroyed: true,
        message: 'O inventário está cheio. Item de instância destruído.',
      };
    }

    const instance = await this.repository.createInstance(
      inventory.id,
      template.id,
      data.createdFrom,
    );

    return { instance };
  }

  async expandInventory(data: ExpandInventoryDto) {
    return await this.repository.incrementInventorySlots(
      data.characterId,
      data.extraSlots,
    );
  }

  async consumeStack(data: ConsumItemStackDto) {
    const result = await this.repository.consumeStack(data);
    return {
      success: true,
      remaining: result ? result.quantity : 0,
    };
  }

  async equipItem(data: EquipItemDto) {
    const inventory = await this.repository.findByCharacterId(data.characterId);

    if (!inventory) {
      throw new BadRequestException('Inventário não encontrado.');
    }

    const instance = await this.repository.findInstanceByIdAndInventory(
      data.itemInstanceId,
      inventory.id,
    );

    if (!instance) {
      throw new BadRequestException(
        'Este item não pertence ao inventário do personagem.',
      );
    }

    await this.equipmentService.equip(data.characterId, {
      itemInstanceId: instance.id,
    });

    return {
      success: true,
      message: 'Item equipado com sucesso.',
    };
  }
}
