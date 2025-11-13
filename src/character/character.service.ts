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
    if (
      account?.accountType !== 'PREMIUM' &&
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

  async updateCharacterProgress(
    characterId: string,
    xpGain: number,
    monsterName: string,
  ) {
    const character = await this.findById(characterId);
    if (!character?.progress) {
      throw new BadRequestException(
        'Não há um progresso deste personagem com este ID.',
      );
    }
    let actualExperience = character?.progress?.actualExperience + xpGain;
    let lvl = character.lvl;

    const xpToNextLevel = (level: number) => 40 * level ** 2;

    let levelUp = false;

    while (actualExperience >= xpToNextLevel(lvl)) {
      actualExperience -= xpToNextLevel(lvl);
      lvl += 1;
      levelUp = true;
    }

    await this.repository.updateCharacterLvl(
      characterId,
      character.progress.id,
      lvl,
      actualExperience,
    );

    return {
      message: levelUp
        ? 'Parabéns, você passou de nível!'
        : `Você matou o ${monsterName} e ganhou ${xpGain} de xp.`,
    };
  }
}
