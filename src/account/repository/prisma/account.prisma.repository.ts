import { Injectable } from '@nestjs/common';
import { AccountRepository } from '../account.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { AccountCreateDto } from 'src/account/dto/account.create.dto';
import { User } from 'src/account/entities/user.entity';

@Injectable()
export class AccountPrismaRepository implements AccountRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: AccountCreateDto) {
    return await this.prisma.user.create({
      data: {
        email: data.email,
        idade: data.age,
        name: data.name,
        nacionality: data.nacionality,
        password: data.password,
        confirmed: false,
      },
    });
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findFirst({
      where: {
        email,
      },
    });
  }

  async findById(id: string): Promise<User | null> {
    return await this.prisma.user.findFirst({
      where: {
        id,
      },
    });
  }

  async confirm(id: string): Promise<void> {
    await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        confirmed: true,
      },
    });
  }

  async findAll(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }
}
