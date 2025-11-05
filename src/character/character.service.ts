import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateCharacterDto } from './dto/create-character.dto';
import { CharacterRepository } from './repository/character.repository';
import { AccountService } from 'src/account/account.service';

@Injectable()
export class CharacterService {
  constructor(
    private readonly repository: CharacterRepository,
    private readonly accountService: AccountService,
  ) {}

  async create(createCharacterDto: CreateCharacterDto) {
    const character = await this.repository.findByNickname(
      createCharacterDto.nickname,
    );
    if (character) {
      throw new BadRequestException(
        'Já existe um personagem com este nickname',
      );
    }
    const account = await this.accountService.findAccountById(
      createCharacterDto.accountId,
    );
    console.log(account);
    if (
      account?.accountType !== 'PREMMIUM' &&
      (account?.characters?.length ?? 0) >= 1
    ) {
      throw new BadRequestException(
        'Você só pode ter um personagem por conta. Para conseguir cadastrar mais, adquira uma premmium account.',
      );
    }
    try {
      return await this.repository.create(createCharacterDto);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'Houve um erro ao criar um personagem.',
      );
    }
  }

  async findAll() {
    return await this.repository.findAll();
  }

  async findById(id: string) {
    return await this.repository.findById(id);
  }

  async incrementGold(id: string, gold: number) {
    return await this.repository.incrementGold(id, gold);
  }
}
