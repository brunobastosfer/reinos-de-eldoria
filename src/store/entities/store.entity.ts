import { StoreItem } from './store-item.entity';

export class Store {
  id: string;
  characterId: string;
  items: StoreItem[];
  createdAt: Date;
  updatedAt: Date;
}
