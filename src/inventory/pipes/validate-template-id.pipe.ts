// src/inventory/pipes/validate-template-id.pipe.ts

import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

/**
 * Pipe responsável por validar se o templateId enviado existe
 * na tabela Item (item modelo base).
 */
@Injectable()
export class ValidateTemplateIdPipe implements PipeTransform {
  constructor(private readonly prisma: PrismaService) {}

  async transform(value: any) {
    if (!value || typeof value !== 'string') {
      throw new BadRequestException('templateId inválido.');
    }

    const template = await this.prisma.item.findUnique({
      where: { id: value },
    });

    if (!template) {
      throw new BadRequestException(
        `Nenhum item template encontrado com o ID: ${value}`,
      );
    }

    return value;
  }
}
