import { IsIn, IsString, IsUUID } from 'class-validator';

export class BattleActionDto {
  @IsUUID()
  characterId: string;

  @IsString()
  @IsIn(['ATTACK', 'FLEE'])
  action: 'ATTACK' | 'FLEE';
}
