import { ClasseType, Attribute } from '@prisma/client';

export function mapClasseToSkillType(classe: ClasseType): Attribute {
  switch (classe) {
    case ClasseType.ARCHER:
      return Attribute.DISTANCE;

    case ClasseType.KNIGHT:
      return Attribute.SWORD;

    case ClasseType.MAGE:
    case ClasseType.HEALER:
      return Attribute.MAGIC;

    default:
      throw new Error(`Classe inválida: ${classe}`);
  }
}
