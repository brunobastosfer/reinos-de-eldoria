// src/monster/monster.service.ts
import { BadRequestException, Injectable } from '@nestjs/common';
import { MonsterCreateDto } from './dto/monster.create.dto';
import { MonsterRepository } from './repository/monster.repository';
import { MonsterDefeatDto } from './dto/monster-defeat.dto';
import { BoostType, ItemRarity } from '@prisma/client';
import { Monster } from './entities/monster.entity';
import { DropService } from 'src/drop/drop.service';
import { CharacterService } from 'src/character/character.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { InventoryService } from 'src/inventory/inventory.service';
import { CreateDropLogDto } from 'src/drop/dto/create-drop-log.dto';

/**
 * MonsterService
 *
 * Regras de drop / derrota de monstro.
 * Observações:
 * - a lógica de inventário (criação de instância / pilha / destruição) fica no InventoryService.
 * - aqui apenas processamos o roll, calculamos quantidades e delegamos ao inventário.
 */
@Injectable()
export class MonsterService {
  constructor(
    private readonly repository: MonsterRepository,
    private readonly dropService: DropService,
    private readonly characterService: CharacterService,
    private readonly inventoryService: InventoryService, // injetado corretamente
    private readonly prisma: PrismaService, // usado para buscar templates quando necessário
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

  async findById(id: string): Promise<Monster | null> {
    return await this.repository.findById(id);
  }

  /**
   * Estrutura de retorno da chamada ao InventoryService.addItemToInventory
   * Definimos a interface local para garantir tipagem e evitar 'any'.
   */
  private typeInventoryResult() {
    return {} as {
      stack?: { id: string; templateId: string; quantity: number };
      instances?: { id: string }[];
      destroyed?: boolean;
      destroyedCount?: number;
    };
  }

  async monsterDefeat(data: MonsterDefeatDto) {
    const character = await this.characterService.findById(data.characterId);
    const monster = await this.repository.findById(data.monsterId);

    if (!character || !monster) {
      throw new BadRequestException('Monstro ou personagem não encontrados.');
    }

    // ------------------------------------------------------------
    // VALIDAR DROP CONFIGURADO
    // ------------------------------------------------------------
    if (!monster.MonsterDrop?.length) {
      throw new BadRequestException(
        'O monstro derrotado não possui drop configurado.',
      );
    }

    console.log("monster", monster.MonsterDrop[0])

    const monsterDrop = monster.MonsterDrop[0];

    // ------------------------------------------------------------
    // LUCKY BOOST
    // ------------------------------------------------------------
    let hasLuckyBoost = false;

    if (character.boosters) {
      hasLuckyBoost = character.boosters.some(
        (b) =>
          b.booster.type === BoostType.LUCKY &&
          b.booster.isActive &&
          new Date() < b.booster.expiresAt,
      );
    }

    const luckMultiplier = hasLuckyBoost ? 2.0 : 1.0;

    // ------------------------------------------------------------
    // PROCESSAR DROP DE ITENS (rolls)
    // ------------------------------------------------------------
    const droppedResults: { templateId: string; quantity: number }[] = [];

    if (monsterDrop.possibleItems) {
      for (const dropItem of monsterDrop.possibleItems) {
        const rarityMultiplier = this.getRarityMultiplier(dropItem.rarity);
        const chance = dropItem.baseChance * rarityMultiplier * luckMultiplier;
        const finalChance = Math.min(chance, 1.0);

        if (Math.random() < finalChance) {
          // BUSCAR TEMPLATE DO ITEM
          const template = await this.prisma.item.findUnique({
            where: { id: dropItem.itemId },
          });

          if (!template) continue;

          let quantity = 1;

          // se for empilhável, usamos min/max definidos no MonsterDropItem
          if (template.stackable) {
            quantity = this.randomWithLuck(
              dropItem.minQuantity ?? 1,
              dropItem.maxQuantity ?? 1,
              luckMultiplier,
            );
          }

          droppedResults.push({
            templateId: dropItem.itemId,
            quantity,
          });
        }
      }
    }

    // ------------------------------------------------------------
    // ADICIONAR ITENS AO INVENTÁRIO DO PLAYER (delegado ao InventoryService)
    // ------------------------------------------------------------
    const templateIdsLog: string[] = [];
    const instanceIdsLog: string[] = [];

    for (const dr of droppedResults) {
      // tipamos o resultado para evitar 'any' e acessos inseguros
      const result = (await this.inventoryService.addItemToInventory({
        characterId: character.id,
        templateId: dr.templateId,
        quantity: dr.quantity,
        createdFrom: `monster:${monster.id}`,
      })) as {
        stack?: { id: string; templateId: string; quantity: number };
        instances?: { id: string }[];
        destroyed?: boolean;
        destroyedCount?: number;
      };

      // pilha criada ou atualizada -> log template
      if (result?.stack) {
        templateIdsLog.push(dr.templateId);
      }

      // instâncias criadas -> log template + instâncias
      if (result?.instances && result.instances.length > 0) {
        templateIdsLog.push(dr.templateId);
        instanceIdsLog.push(...result.instances.map((i) => i.id));
      }

      // destruído -> log template (registramos que o template participou do roll)
      if (result?.destroyed) {
        templateIdsLog.push(dr.templateId);
      }
    }

    // ------------------------------------------------------------
    // CALCULAR GOLD
    // ------------------------------------------------------------
    const gold = this.getGoldDrop(
      monsterDrop.minGold,
      monsterDrop.maxGold,
      monster.lvl,
    );

    await this.characterService.incrementGold(character.id, gold);

    // ------------------------------------------------------------
    // CRIAR DROP LOG (usar DTO atualizado)
    // ------------------------------------------------------------
    const dropLogDto: CreateDropLogDto = {
      goldDropped: gold,
      luckApplied: luckMultiplier,
      playerId: character.accountId,
      characterId: character.id,
      monsterId: monster.id,
      itemTemplateIds: templateIdsLog,
      itemInstanceIds: instanceIdsLog,
    };

    await this.dropService.createDropLog(dropLogDto);

    // ------------------------------------------------------------
    // XP E MENSAGEM DE NIVEL
    // ------------------------------------------------------------
    const xpMsg = await this.characterService.updateCharacterProgress(
      character.id,
      monster.experience,
      monster.name,
    );

    return {
      goldDropped: gold,
      itemsDropped: droppedResults,
      message: xpMsg.message,
    };
  }

  getRarityMultiplier(rarity: ItemRarity): number {
    switch (rarity) {
      case 'COMMON':
        return 1;
      case 'UNCOMMON':
        return 0.8;
      case 'RARE':
        return 0.5;
      case 'EPIC':
        return 0.25;
      case 'LEGENDARY':
        return 0.1;
      default:
        return 1;
    }
  }

  getGoldDrop(min: number, max: number, monsterLevel: number): number {
    const base = Math.floor(Math.random() * (max - min + 1)) + min;
    const bonus = Math.floor(monsterLevel * 1.5);
    const total = base + bonus;

    return Math.max(min, Math.min(total, max));
  }

  private randomWithLuck(min: number, max: number, luckMultiplier: number) {
    if (luckMultiplier <= 1) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const a = Math.floor(Math.random() * (max - min + 1)) + min;
    const b = Math.floor(Math.random() * (max - min + 1)) + min;
    return Math.max(a, b);
  }
}
