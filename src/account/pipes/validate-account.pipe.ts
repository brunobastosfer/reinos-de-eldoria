import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { AccountService } from '../account.service';
import { PlanService } from 'src/plan/plan.service';
import { PremiumAccountDto } from '../dto/premmium-account.dto';

@Injectable()
export class AccountValidationPipe implements PipeTransform {
  constructor(
    private readonly service: AccountService,
    private readonly planService: PlanService,
  ) {}

  async transform(value: PremiumAccountDto) {
    const account = await this.service.findAccountById(value.accountId);
    const plan = await this.planService.findById(value.premiumId);

    if (!account) {
      throw new BadRequestException('Não há uma conta com este ID.');
    }

    if (!plan) {
      throw new BadRequestException('Não há nenhum plano com o ID informado.');
    }

    return value;
  }
}
