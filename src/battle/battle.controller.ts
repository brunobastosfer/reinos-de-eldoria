import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { BattleService } from './battle.service';
import { StartManualBattleDto } from './dto/start-manual-battle.dto';
import { BattleActionDto } from './dto/battle-action.dto';

@Controller('battle')
export class BattleController {
  constructor(private readonly battleService: BattleService) {}

  @Post('manual')
  create(@Body() createBattleDto: StartManualBattleDto) {
    return this.battleService.startManualBattle(createBattleDto);
  }

  @Post('action')
  action(@Body() dto: BattleActionDto) {
    return this.battleService.executeAction(dto);
  }

  @Get('active/:characterId')
  getActive(@Param('characterId') characterId: string) {
    return this.battleService.getActiveBattle(characterId);
  }
}
