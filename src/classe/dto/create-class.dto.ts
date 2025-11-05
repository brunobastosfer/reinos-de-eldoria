import { IsIn, IsInt, IsString } from 'class-validator';

export class CreateClassDto {
  @IsString()
  @IsIn(['KNIGHT', 'MAGE', 'HEALER', 'ARCHER'])
  type: 'KNIGHT' | 'MAGE' | 'HEALER' | 'ARCHER';

  @IsInt()
  manaBase: number;

  @IsInt()
  lifeBase: number;

  @IsInt()
  damageBase: number;

  @IsInt()
  defenseBase: number;

  @IsString()
  @IsIn(['DISTANCE', 'SWORD', 'MAGIC'])
  attribute: 'DISTANCE' | 'SWORD' | 'MAGIC';
}
