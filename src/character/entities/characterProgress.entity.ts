import { Character } from './character.entity';

export class Progress {
  id: string;
  actualExperience: number;
  toNextLvl: number;
  characterId: string;
  character?: Character;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
