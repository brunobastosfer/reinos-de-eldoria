import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserCreateDto } from './dto/user.create.dto';
import { AccountService } from './account.service';
import { CredentialsValidationPipe } from './pipes/validate-credential.pipe';
import { LoginDto } from './dto/login.dto';
import { PremiumAccountDto } from './dto/premmium-account.dto';
import { AccountValidationPipe } from './pipes/validate-account.pipe';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}
  @Post('/create')
  async create(@Body() data: UserCreateDto) {
    await this.accountService.create(data);
  }

  @Post('/login')
  async login(@Body(CredentialsValidationPipe) credentials: LoginDto) {
    const user = await this.accountService.validate(credentials);
    if (user) {
      return this.accountService.login(user);
    }
  }

  //TODO: Criar de integração com api de email para o usuário validar email.
  @Post('/confirm')
  async confirm(@Body() id: any) {
    console.log("id", id)
    await this.accountService.confirm(id.id);
    return {
      message: 'Conta confirmada com sucesso.',
    };
  }

  @Get('')
  async findAll() {
    return await this.accountService.findAll();
  }

  //TODO: Criar um JOB para todo dia expirar as premmium account.
  //TODO: Integrar com api de pagamento.
  @Post('/active-premium')
  async activePremmium(
    @Body(AccountValidationPipe) premiumAccountDto: PremiumAccountDto,
  ) {
    return await this.accountService.activePremmium(premiumAccountDto);
  }
}
