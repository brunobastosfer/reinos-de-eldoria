import { IsEmail, IsString } from 'class-validator';
import { User } from '../entities/user.entity';

export class LoginDto {
  @IsEmail({}, { message: 'Email inválido' })
  email: string;

  @IsString()
  password: string;

  user?: User;
}
