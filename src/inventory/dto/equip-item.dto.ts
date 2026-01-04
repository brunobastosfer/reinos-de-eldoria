import { IsString } from 'class-validator';

export class EquipItemDto {
  @IsString()
  characterId: string;

  @IsString()
  itemInstanceId: string;
}
