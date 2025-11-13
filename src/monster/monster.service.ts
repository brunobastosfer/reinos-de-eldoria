import { BadRequestException, Injectable } from '@nestjs/common';
import { MonsterCreateDto } from './dto/monster.create.dto';
import { MonsterRepository } from './repository/monster.repository';
import { MonsterDefeatDto } from './dto/monster-defeat.dto';
import { BoostType, RarityType } from '@prisma/client';
import { Monster } from './entities/monster.entity';
import { MonsterDrop } from 'src/drop/entities/monster-drop.entity';
import { DropService } from 'src/drop/drop.service';
import { CharacterService } from 'src/character/character.service';

@Injectable()
export class MonsterService {
  constructor(
    private readonly repository: MonsterRepository,
    private readonly dropService: DropService,
    private readonly characterService: CharacterService,
  ) {}

  async create(data: MonsterCreateDto): Promise<Monster> {
    const monster = await this.repository.findByMonster(data.name);
    if (monster) {
      throw new BadRequestException('Já existe um monstro com este nome');
    }
    return await this.repository.create(data);
  }

  async findAll(): Promise<Monster[]> {
    return await this.repository.findAll();
  }

  async monsterDefeat(data: MonsterDefeatDto) {
    const character = await this.characterService.findById(data.characterId);
    const monster = await this.repository.findById(data.monsterId);
    if (!character || !monster) {
      throw new BadRequestException('Monstro ou personagem não encontrados.');
    }
    let monsterDrop: MonsterDrop | null = null;
    let hasLuckyBoost;
    if (monster.MonsterDrop && monster.MonsterDrop.length > 0) {
      monsterDrop = monster.MonsterDrop[0];
    } else {
      throw new BadRequestException(
        'O monsto derrotado ainda não possui um drop configurado.',
      );
    }

    if (character.boosters) {
      hasLuckyBoost = character.boosters.some(
        (b) =>
          b.booster.type === BoostType.LUCKY &&
          b.booster.isActive &&
          new Date() < b.booster.expiresAt,
      );
    }

    const luckMultiplier = hasLuckyBoost ? 2.0 : 1.0;

    const droppedItems: string[] = [];

    if (monsterDrop && monsterDrop.possibleItems) {
      for (const dropItem of monsterDrop.possibleItems) {
        const rarityMultiplier = this.getRarityMultiplier(dropItem.rarity);
        const chance = dropItem.baseChance * rarityMultiplier * luckMultiplier;
        const finalChance = Math.min(chance, 1.0);

        if (
          Math.random() < finalChance &&
          !droppedItems.includes(dropItem.itemId)
        ) {
          droppedItems.push(dropItem.itemId);
        }
      }
      const gold = this.getGoldDrop(
        monsterDrop.minGold,
        monsterDrop.maxGold,
        monster.lvl,
      );

      await this.dropService.createDropLog({
        goldDropped: gold,
        playerId: character.accountId,
        characterId: character.id,
        monsterId: monster.id,
        luckApplied: luckMultiplier,
        itemsDropped: droppedItems,
      });

      await this.characterService.incrementGold(character.id, gold);

      return {
        goldDropped: gold,
        itemsDropped: droppedItems,
      };
    } else {
      const gold = this.getGoldDrop(
        monsterDrop.minGold,
        monsterDrop.maxGold,
        monster.lvl,
      );

      await this.dropService.createDropLog({
        goldDropped: gold,
        playerId: character.accountId,
        characterId: character.id,
        monsterId: monster.id,
        luckApplied: luckMultiplier,
        itemsDropped: droppedItems,
      });

      await this.characterService.incrementGold(character.id, gold);

      const message = await this.characterService.updateCharacterProgress(
        character.id,
        monster.experience,
        monster.name,
      );

      return {
        goldDropped: gold,
        itemsDropped: droppedItems,
        message,
      };
    }
  }

  getRarityMultiplier(rarity: RarityType): number {
    switch (rarity) {
      case 'COMUM':
        return 1;
      case 'INCOMUM':
        return 0.8;
      case 'RARO':
        return 0.5;
      case 'EPIC':
        return 0.25;
      case 'LENDARY':
        return 0.1;
    }
  }

  getGoldDrop(min: number, max: number, monsterLevel: number): number {
    const base = Math.floor(Math.random() * (max - min + 1)) + min;
    const bonus = Math.floor(monsterLevel * 1.5);
    const total = base + bonus;

    return Math.max(min, Math.min(total, max));
  }
}
