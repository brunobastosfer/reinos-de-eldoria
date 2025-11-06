import { CreatePlanDto } from '../dto/create-plan.dto';
import { Plan } from '../entities/plan.entity';

export abstract class PlanRepository {
  abstract create(data: CreatePlanDto): Promise<Plan>;
  abstract findAll(): Promise<Plan[]>;
  abstract findById(id: string): Promise<Plan | null>;
}
