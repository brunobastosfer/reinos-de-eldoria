import { plainToInstance } from 'class-transformer';
import {
  Injectable,
  PipeTransform,
  UnauthorizedException,
} from '@nestjs/common';
import { AccountService } from '../account.service';
import { LoginDto } from '../dto/login.dto';

@Injectable()
export class CredentialsValidationPipe implements PipeTransform {
  constructor(private readonly service: AccountService) {}

  async transform(value: any) {
    const credentials = plainToInstance(LoginDto, value, {
      enableImplicitConversion: true,
    });

    if (credentials) {
      if (!credentials.email) {
        throw new UnauthorizedException('E-mail é obrigatório.');
      }

      const user = await this.service.findByEmail(credentials.email);
      if (!user) {
        throw new UnauthorizedException('Credenciais inválidas.');
      }
      credentials.user = user;

      return credentials;
    }
  }
}
