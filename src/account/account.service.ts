import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AccountCreateDto } from './dto/account.create.dto';
import { AccountRepository } from './repository/account.repository';
import * as bcrypt from 'bcryptjs';
import { User } from './entities/user.entity';
import * as jwt from 'jsonwebtoken';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AccountService {
  constructor(private readonly repository: AccountRepository) {}

  async create(data: AccountCreateDto) {
    const email = await this.repository.findByEmail(data.email);
    if (email) {
      throw new BadRequestException('Já existe uma conta com este email.');
    }
    try {
      const hashedPassword = bcrypt.hashSync(data.password, 10);
      data.password = hashedPassword;
      return await this.repository.create(data);
    } catch (error) {
      throw new BadRequestException('Houve um erro ao criar o usuário');
    }
  }

  async login(user: User) {
    const payload = { sub: user.id };

    const access_jwt = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '3600s',
    });

    const refresh_jwt = jwt.sign(
      { ...payload, refresh: true },
      process.env.JWT_SECRET,
      { expiresIn: '1d' },
    );
    return {
      access_token: access_jwt,
      refresh_token: refresh_jwt,
      data: await this.repository.findById(user.id),
    };
  }

  async findByEmail(email: string) {
    return await this.repository.findByEmail(email);
  }

  async confirm(id: string) {
    const user = await this.repository.findById(id);
    if (user?.confirmed) {
      throw new BadRequestException('Sua conta já está confirmada.');
    }
    try {
      await this.repository.confirm(id);
    } catch (error) {
      throw new BadRequestException('Erro ao confirmar conta.');
    }
  }

  async validate(credentials: LoginDto) {
    const { user, password } = credentials;
    if (user) {
      const userById = await this.repository.findById(user.id);
      if (!bcrypt.compareSync(password, user.password)) {
        throw new UnauthorizedException('Credenciais Inválidas.');
      }
      if (!userById?.confirmed) {
        throw new UnauthorizedException(
          'Confirme sua conta para efetuar login.',
        );
      }
      return userById;
    }
  }

  async findAll() {
    return await this.repository.findAll();
  }
}
