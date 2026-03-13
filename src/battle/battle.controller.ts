import { Controller, Post, Body } from '@nestjs/common';
import { BattleService } from './battle.service';
import { StartManualBattleDto } from './dto/start-manual-battle.dto';

@Controller('battle')
export class BattleController {
  constructor(private readonly battleService: BattleService) {}

  @Post('manual')
  create(@Body() createBattleDto: StartManualBattleDto) {
    return this.battleService.startManualBattle(createBattleDto);
  }
}
