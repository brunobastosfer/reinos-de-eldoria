import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { StoreRepository } from '../store.repository';
import { Store } from '../../entities/store.entity';
import { StoreItem } from '../../entities/store-item.entity';
import { CreateStoreItemDto } from '../../dto/create-store-item.dto';

@Injectable()
export class StorePrismaRepository implements StoreRepository {
  constructor(private readonly prisma: PrismaService) {}

  // ======================================================
  // CRIAR LOJA
  // ======================================================
  async createStore(characterId: string): Promise<Store> {
    return (await this.prisma.store.create({
      data: { characterId },
      include: { items: true },
    })) as unknown as Store;
  }

  // ======================================================
  // BUSCAR LOJA POR CHARACTER
  // ======================================================
  async findStoreByCharacterId(characterId: string): Promise<Store | null> {
    return (await this.prisma.store.findUnique({
      where: { characterId },
      include: { items: true },
    })) as unknown as Store;
  }

  // ======================================================
  // ATUALIZAR DATA DE REFRESH
  // ======================================================
  async updateRefreshedAt(storeId: string, date: Date): Promise<void> {
    await this.prisma.store.update({
      where: { id: storeId },
      data: { refreshedAt: date },
    });
  }

  // ======================================================
  // LIMPAR ITENS DA LOJA
  // ======================================================
  async clearStoreItems(storeId: string): Promise<void> {
    await this.prisma.storeItem.deleteMany({
      where: { storeId },
    });
  }

  // ======================================================
  // ADICIONAR UM ITEM À LOJA
  // ======================================================
  async addStoreItem(
    storeId: string,
    templateId: string,
    price: number,
  ): Promise<StoreItem> {
    return (await this.prisma.storeItem.create({
      data: { storeId, templateId, price, purchased: false },
    })) as unknown as StoreItem;
  }

  // ======================================================
  // ADICIONAR VÁRIOS ITENS À LOJA
  // ======================================================
  async addStoreItems(
    storeId: string,
    items: CreateStoreItemDto[],
  ): Promise<StoreItem[]> {
    const created: StoreItem[] = [];

    for (const it of items) {
      const s = await this.prisma.storeItem.create({
        data: {
          storeId,
          templateId: it.templateId,
          price: it.price,
          purchased: false,
        },
      });

      created.push(s as StoreItem);
    }

    return created;
  }

  // ======================================================
  // OBTER ITENS DA LOJA
  // ======================================================
  async getStoreItems(storeId: string): Promise<StoreItem[]> {
    return (await this.prisma.storeItem.findMany({
      where: { storeId },
      include: { template: true },
    })) as unknown as StoreItem[];
  }

  // ======================================================
  // BUSCAR ITEM INDIVIDUAL DA LOJA
  // ======================================================
  async findStoreItemById(storeItemId: string): Promise<StoreItem | null> {
    return (await this.prisma.storeItem.findUnique({
      where: { id: storeItemId },
      include: { template: true, store: true },
    })) as unknown as StoreItem;
  }

  // ======================================================
  // MARCAR COMO COMPRADO
  // ======================================================
  async markItemPurchased(storeItemId: string): Promise<void> {
    await this.prisma.storeItem.update({
      where: { id: storeItemId },
      data: { purchased: true },
    });
  }
}
