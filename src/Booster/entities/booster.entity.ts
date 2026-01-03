import { BoostType } from '@prisma/client';
import { CharacterBooster } from './character-booster.entity'

export class Booster {
  id: string;
  type: BoostType;
  activatedAt: Date;
  expiresAt: Date;
  isActive: boolean;
  characters?: CharacterBooster[];
}
