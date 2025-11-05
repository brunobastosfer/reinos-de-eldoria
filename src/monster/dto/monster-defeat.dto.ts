import { IsString } from 'class-validator';

export class MonsterDefeatDto {
  @IsString()
  characterId: string;

  @IsString()
  monsterId: string;
}
