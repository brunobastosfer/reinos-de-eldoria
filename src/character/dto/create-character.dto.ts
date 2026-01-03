import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateCharacterDto {
  @IsString()
  accountId: string;

  @IsString()
  classeId: string;

  @IsString()
  nickname: string;
}
