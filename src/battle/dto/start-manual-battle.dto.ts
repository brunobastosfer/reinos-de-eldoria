import { IsUUID } from 'class-validator';

export class StartManualBattleDto {
  @IsUUID()
  characterId: string;

  @IsUUID()
  monsterId: string;
}
