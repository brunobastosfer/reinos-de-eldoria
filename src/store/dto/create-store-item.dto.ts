import { IsString, IsNumber, IsBoolean } from 'class-validator';

export class CreateStoreItemDto {
  @IsString()
  storeId: string;

  @IsString()
  templateId: string;

  @IsNumber()
  price: number;

  @IsBoolean()
  purchased: boolean;
}
