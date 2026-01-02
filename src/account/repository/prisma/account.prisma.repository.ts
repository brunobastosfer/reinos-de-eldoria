import { Injectable } from '@nestjs/common';
import { AccountRepository } from '../account.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserCreateDto } from 'src/account/dto/user.create.dto';
import { User } from 'src/account/entities/user.entity';
import { Account } from 'src/account/entities/account.entity';
import { AccountCreateDto } from 'src/account/dto/account.create.dto';
import { PremiumAccountDto } from 'src/account/dto/premmium-account.dto';
import { PremiumAccount } from 'src/account/entities/premmium-account.entity';
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
            characters: {
              include: {
                inventory: true,
              },
            },
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
    return await this.prisma.user.findMany({
      include: {
        account: true,
      },
    });
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

  async activePremium(data: PremiumAccountDto) {
    return await this.prisma.$transaction(async (prisma) => {
      // Verificar se ambas as entidades existem antes de criar o relacionamento
      const [premiumAccount, account] = await Promise.all([
        prisma.premiumAccount.findUnique({
          where: { id: data.premiumId },
        }),
        prisma.account.findUnique({
          where: { id: data.accountId },
        }),
      ]);

      if (!premiumAccount) {
        throw new Error('Premium account not found');
      }

      if (!account) {
        throw new Error('Account not found');
      }

      if (!premiumAccount.days) {
        throw new Error('Premium account has no days defined');
      }

      const activatedAt = new Date();
      const expiredAt = new Date(
        activatedAt.getTime() + premiumAccount.days * 24 * 60 * 60 * 1000,
      );

      await prisma.account.update({
        where: {
          id: data.accountId,
        },
        data: {
          accountType: 'PREMIUM',
        },
      });

      const premium = await prisma.premiumToAccount.create({
        data: {
          activatedAt: activatedAt,
          expiratedAt: expiredAt,
          accountId: data.accountId,
          premiumId: data.premiumId,
        },
        include: {
          premiumAccount: true,
          account: true,
        },
      });

      return premium;
    });
  }

  async findPremiumAccount(id: string): Promise<PremiumAccount | null> {
    return await this.prisma.premiumAccount.findUnique({
      where: {
        id,
      },
    });
  }
}
