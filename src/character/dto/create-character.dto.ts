import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateCharacterDto {
  @IsInt()
  mana: number;

  @IsInt()
  life: number;

  @IsInt()
  damage: number;

  @IsInt()
  nivelAttribute: number;

  @IsInt()
  defense: number;

  @IsInt()
  magic: number;

  @IsString()
  accountId: string;

  @IsString()
  classeId: string;

  @IsString()
  nickname: string;

  @IsOptional()
  gold: number;
}
