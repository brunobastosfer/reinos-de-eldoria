import { Attribute, ClasseType } from '@prisma/client';
import { Character } from 'src/character/entities/character.entity';

export class Classe {
  id: string;
  type: ClasseType;
  manaBase: number;
  lifeBase: number;
  damageBase: number;
  defenseBase: number;
  attribute: Attribute;
  skill?: any;
  character?: Character[];
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
}
