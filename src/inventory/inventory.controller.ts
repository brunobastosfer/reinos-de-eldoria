// src/inventory/inventory.controller.ts

import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { InventoryService } from './inventory.service';

import { ExpandInventoryDto } from './dto/expand-inventory.dto';
import { CreateItemInventoryDto } from './dto/create-item-invetory.dto';
import { ConsumItemStackDto } from './dto/consum-item-stock.dto';
import { ValidateCharacterIdPipe } from 'src/character/pipes/validate-character-id.pipe';
import { ValidateTemplateIdPipe } from './pipes/validate-template-id.pipe';
import { EquipItemDto } from './dto/equip-item.dto';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly service: InventoryService) {}

  // ============================================================
  // CONSULTAR INVENTÁRIO
  // ============================================================
  @Get(':characterId')
  async getInventory(
    @Param('characterId', ValidateCharacterIdPipe)
    characterId: string,
  ) {
    return this.service.getInventory(characterId);
  }

  // ============================================================
  // ADICIONAR ITEM AO INVENTÁRIO
  // ============================================================
  @Post('add')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async addItem(
    @Body('characterId', ValidateCharacterIdPipe) characterId: string,
    @Body('templateId', ValidateTemplateIdPipe) templateId: string,
    @Body() body: CreateItemInventoryDto,
  ) {
    body.characterId = characterId;
    body.templateId = templateId;
    return this.service.addItemToInventory(body);
  }

  // ============================================================
  // CONSUMIR QUANTIDADE DA PILHA
  // ============================================================
  @Post('consume')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async consume(@Body() body: ConsumItemStackDto) {
    return this.service.consumeStack(body);
  }

  // ============================================================
  // EXPANDIR O INVENTÁRIO
  // ============================================================
  @Post('expand')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async expand(@Body() body: ExpandInventoryDto) {
    return await this.service.expandInventory(body);
  }

  @Post('equip')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async equipItem(@Body() body: EquipItemDto) {
    return this.service.equipItem(body);
  }

  @Post('unequip')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async uniquipItem(@Body() body: EquipItemDto) {
    return this.service.equipItem(body);
  }
}
