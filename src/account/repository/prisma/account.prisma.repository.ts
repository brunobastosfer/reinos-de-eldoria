import { Injectable } from '@nestjs/common';
import { AccountRepository } from '../account.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserCreateDto } from 'src/account/dto/user.create.dto';
import { User } from 'src/account/entities/user.entity';
import { Account } from 'src/account/entities/account.entity';
import { AccountCreateDto } from 'src/account/dto/account.create.dto';

@Injectable()
export class AccountPrismaRepository implements AccountRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: UserCreateDto) {
    return await this.prisma.user.create({
      data: {
        email: data.email,
        age: data.age,
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
      include: {
        account: {
          include: {
            characters: true,
          },
        },
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

  async createAccount(data: AccountCreateDto): Promise<Account> {
    const account = await this.prisma.account.create({
      data: {
        accountStatus: data.accountStatus,
        accountType: data.accountType,
        userId: data.userId,
      },
    });

    return account as Account;
  }

  async findAccountById(id: string): Promise<Account | null> {
    return await this.prisma.account.findUnique({
      where: {
        id,
      },
      include: {
        characters: true,
      },
    });
  }
}
