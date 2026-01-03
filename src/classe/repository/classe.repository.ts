import { ClasseType } from '@prisma/client';
import { CreateClassDto } from '../dto/create-class.dto';
import { Classe } from '../entities/class.entity';

export abstract class ClasseRepository {
  abstract create(data: CreateClassDto): Promise<Classe>;
  abstract findAll(): Promise<Classe[]>;
  abstract findByClassType(classType: ClasseType): Promise<Classe | null>;
  abstract findOne(id: string): Promise<Classe | null>;
}
