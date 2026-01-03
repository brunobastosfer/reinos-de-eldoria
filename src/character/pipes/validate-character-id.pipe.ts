// src/inventory/pipes/validate-character-id.pipe.ts

import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

/**
 * Pipe responsável por validar se um characterId existe no banco.
 * Caso não exista, a requisição é imediatamente rejeitada.
 */
@Injectable()
export class ValidateCharacterIdPipe implements PipeTransform {
  constructor(private readonly prisma: PrismaService) {}

  async transform(value: any) {
    if (!value || typeof value !== 'string') {
      throw new BadRequestException('characterId inválido.');
    }

    const character = await this.prisma.character.findUnique({
      where: { id: value },
    });

    if (!character) {
      throw new BadRequestException(
        `Nenhum personagem encontrado com o ID: ${value}`,
      );
    }

    return value;
  }
}
