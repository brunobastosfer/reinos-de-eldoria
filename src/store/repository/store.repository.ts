import { Store } from '../entities/store.entity';
import { StoreItem } from '../entities/store-item.entity';
import { CreateStoreItemDto } from '../dto/create-store-item.dto';

export abstract class StoreRepository {
  // Criar loja
  abstract createStore(characterId: string): Promise<Store>;

  // Buscar loja
  abstract findStoreByCharacterId(characterId: string): Promise<Store | null>;

  // Atualizar data de refresh
  abstract updateRefreshedAt(storeId: string, date: Date): Promise<void>;

  // Limpar itens da loja
  abstract clearStoreItems(storeId: string): Promise<void>;

  // Adicionar um item à loja
  abstract addStoreItem(
    storeId: string,
    templateId: string,
    price: number,
  ): Promise<StoreItem>;

  // Adicionar vários itens à loja
  abstract addStoreItems(
    storeId: string,
    items: CreateStoreItemDto[],
  ): Promise<StoreItem[]>;

  // Obter todos itens da loja
  abstract getStoreItems(storeId: string): Promise<StoreItem[]>;

  // Buscar item individual
  abstract findStoreItemById(storeItemId: string): Promise<StoreItem | null>;

  // Marcar item como comprado
  abstract markItemPurchased(storeItemId: string): Promise<void>;
}
