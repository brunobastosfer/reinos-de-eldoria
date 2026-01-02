import { IsString, IsArray } from 'class-validator';
import { CreateStoreItemDto } from './create-store-item.dto';

export class CreateStoreDto {
  @IsString()
  characterId: string;

  @IsArray()
  items: CreateStoreItemDto[];
}
