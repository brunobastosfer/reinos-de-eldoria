import { IsNumber, IsString } from 'class-validator';

export class AccountCreateDto {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsNumber()
  age: number;

  @IsString()
  nacionality: string;

  @IsString()
  password: string;
}
