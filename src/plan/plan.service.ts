import { Injectable } from '@nestjs/common';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { PlanRepository } from './repository/plan.repository';

@Injectable()
export class PlanService {
  constructor(private readonly repository: PlanRepository) {}

  async create(createPlanDto: CreatePlanDto) {
    return await this.repository.create(createPlanDto);
  }

  findAll() {
    return `This action returns all plan`;
  }

  async findById(id: string) {
    return await this.repository.findById(id);
  }

  update(id: number, updatePlanDto: UpdatePlanDto) {
    return `This action updates a #${id} plan`;
  }

  remove(id: number) {
    return `This action removes a #${id} plan`;
  }
}
