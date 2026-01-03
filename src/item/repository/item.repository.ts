import { ItemCreateDto } from '../dto/item.create.dto';
import { Item } from '../entities/item.entity';

export abstract class ItemRepository {
  abstract create(data: ItemCreateDto): Promise<Item>;
  abstract findByName(name: string): Promise<Item | null>;
  abstract findById(id: string): Promise<Item | null>;
  abstract findAll(): Promise<Item[]>;
  abstract findTemplatesByTypeAndRarity(
    itemType: string,
    rarity: string,
  ): Promise<any[]>;
}
