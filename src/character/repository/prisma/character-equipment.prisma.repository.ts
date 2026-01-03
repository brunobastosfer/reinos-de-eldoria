import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CharacterEquipmentRepository } from '../character-equipment.repository ';

@Injectable()
export class CharacterEquipmentPrismaRepository
  implements CharacterEquipmentRepository
{
  constructor(private readonly prisma: PrismaService) {}

  async findByCharacterId(characterId: string) {
    return await this.prisma.characterEquipment.findUnique({
      where: { characterId },
    });
  }

  async findByCharacterIdFull(characterId: string) {
    return await this.prisma.characterEquipment.findUnique({
      where: { characterId },
      include: {
        weapon: { include: { template: true } },
        shield: { include: { template: true } },
        armor: { include: { template: true } },
        helmet: { include: { template: true } },
        leg: { include: { template: true } },
        boot: { include: { template: true } },
        amulet: { include: { template: true } },
        ring1: { include: { template: true } },
        ring2: { include: { template: true } },
      },
    });
  }

  async clearSlot(characterId: string, slot: string): Promise<void> {
  await this.prisma.characterEquipment.update({
    where: { characterId },
    data: {
      [slot]: null,
    },
  });
}


  async findInstanceInInventory(characterId: string, instanceId: string) {
    return await this.prisma.itemInstance.findFirst({
      where: {
        id: instanceId,
        equipped: false,
        inventory: { characterId },
      },
      include: { template: true },
    });
  }

  async findItemInstance(instanceId: string) {
    return this.prisma.itemInstance.findUnique({
      where: { id: instanceId },
      include: { template: true },
    });
  }

  async setSlot(
    characterId: string,
    slot: string,
    itemInstanceId: string | null,
  ) {
    await this.prisma.characterEquipment.update({
      where: { characterId },
      data: { [slot]: itemInstanceId },
    });

    // atualizar no itemInstance
    if (itemInstanceId) {
      await this.prisma.itemInstance.update({
        where: { id: itemInstanceId },
        data: { equipped: true, inventoryId: null },
      });
    }
  }

  async createEmptyEquipment(characterId: string) {
    return await this.prisma.characterEquipment.create({
      data: { characterId },
    });
  }

  async returnToInventory(
    characterId: string,
    instanceId: string,
  ): Promise<void> {
    const inventory = await this.prisma.inventory.findUnique({
      where: { characterId },
    });

    if (!inventory) {
      throw new Error('Inventário não encontrado.');
    }

    await this.prisma.itemInstance.update({
      where: { id: instanceId },
      data: { inventoryId: inventory.id },
    });
  }
}
