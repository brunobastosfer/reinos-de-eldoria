import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateCharacterDto } from './dto/create-character.dto';
import { CharacterRepository } from './repository/character.repository';
import { AccountService } from 'src/account/account.service';
import { Classe } from 'src/classe/entities/class.entity';
import { ClasseService } from 'src/classe/classe.service';
import { CharacterEquipmentService } from './character-equipment.service';
import { CharacterStatsService } from './character-stats.service';

@Injectable()
export class CharacterService {
  constructor(
    private readonly repository: CharacterRepository,
    private readonly accountService: AccountService,
    private readonly classeService: ClasseService,
    private readonly characterEquipmentService: CharacterEquipmentService,
    private readonly characterStats: CharacterStatsService,
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
    const classe = await this.classeService.findOne(
      createCharacterDto.classeId,
    );

    if (!classe) {
      throw new BadRequestException('Não existe uma classe com este ID.');
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
      const baseStats = this.calculateBaseStats(classe, 1);

      return await this.repository.create({
        accountId: createCharacterDto.accountId,
        classeId: createCharacterDto.classeId,
        nickname: createCharacterDto.nickname,
        ...baseStats,
      });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'Houve um erro ao criar um personagem.',
      );
    }
  }

  private calculateBaseStats(classe: Classe, level: number) {
    return {
      life: Math.floor(classe.lifeBase + classe.lifeBase * 0.12 * (level - 1)),
      mana: Math.floor(classe.manaBase + classe.manaBase * 0.1 * (level - 1)),
      damage: Math.floor(
        classe.damageBase + classe.damageBase * 0.08 * (level - 1),
      ),
      defense: Math.floor(
        classe.defenseBase + classe.defenseBase * 0.06 * (level - 1),
      ),
      magic: classe.attribute === 'MAGIC' ? 1 : 0,
      nivelAttribute: 0,
    };
  }

  async findAll() {
    return await this.repository.findAll();
  }

  async findById(id: string) {
    return await this.repository.findById(id);
  }

  async findEquipmentByCharacterId(id: string) {
    const equipments =
      await this.characterEquipmentService.findEquipmentByCharacterId(id);
    const status = await this.repository.findById(id);

    return {
      equipments,
      status: {
        damage: status?.damage,
        life: status?.life,
        mana: status?.mana,
        magic: status?.magic,
        defense: status?.defense,
        nivelAttribute: status?.skillProgress?.level,
        skillProgressExperience: status?.skillProgress?.experience,
        skillProgressToNextLevel: status?.skillProgress?.toNextLevel,
        stamina: status?.stamina,
      },
    };
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
      throw new BadRequestException('Não há progresso para este personagem.');
    }

    const hasBoosterXp = character.boosters?.some(
      (booster) =>
        booster.booster.type === 'EXPERIENCE' && booster.booster.isActive,
    );

    const xpMultiplier = hasBoosterXp ? 2 : 1;
    const gainedXp = xpGain * xpMultiplier;

    let actualExperience = character.progress.actualExperience + gainedXp;

    let lvl = character.lvl;
    const xpToNextLevel = (level: number) => 40 * level ** 2;

    let levelUp = false;

    while (actualExperience >= xpToNextLevel(lvl)) {
      actualExperience -= xpToNextLevel(lvl);
      lvl++;
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
        ? `Parabéns! Você subiu do nível ${character.lvl} para ${lvl}!`
        : `Você matou o ${monsterName} e ganhou ${gainedXp} de XP.`,
    };
  }
}
