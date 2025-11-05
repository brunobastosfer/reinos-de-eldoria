import { ClasseType } from '@prisma/client';
import { CreateClassDto } from '../dto/create-class.dto';
import { Class } from '../entities/class.entity';

export abstract class ClasseRepository {
  abstract create(data: CreateClassDto): Promise<Class>;
  abstract findAll(): Promise<Class[]>;
  abstract findByClassType(classType: ClasseType): Promise<Class | null>;
}
