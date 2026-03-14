export class SkillEntity {
  id: string;

  name: string;
  description: string;

  mana: number;

  type: 'ATACK' | 'DEFENSE' | 'HEAL';

  skillScaling: number;

  value: {
    value: number;
  };

  skillBenefity?: {
    value: number;
  } | null;
}
