export interface CharacterBattleEntity {
  id: string;
  nickname: string;
  lvl: number;
  life: number;
  mana: number;
  damage: number;
  defense: number;
  dodge?: number;
  agility?: number;
  magic?: number;
  magicDamage?: number;
  magicPower?: number;
  skillCharacterProgress?: {
    id: string;
    level: number;
    experience: number;
  };
  skillProgress?: {
    id: string;
    level: number;
    experience: number;
  };
}
