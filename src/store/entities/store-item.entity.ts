import { Item } from 'src/item/entities/item.entity';

export class StoreItem {
  id: string;
  storeId: string;
  item: Item;
  templateId: string;
  price: number;
  purchased: boolean;
  createdAt: Date;
  updatedAt: Date;
}
