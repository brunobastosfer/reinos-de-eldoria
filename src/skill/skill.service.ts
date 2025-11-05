import { Injectable } from '@nestjs/common';
import { SkillRepository } from './repository/skill.repository';
import { SkillCreateDto } from './dto/skill.create.dto';

@Injectable()
export class SkillService {
  constructor(private readonly repository: SkillRepository) {}

  create(data: SkillCreateDto): any {
    const skill = this.repository.findBySkill(data.name);
    console.log(skill);
    if (skill) {
      return 'Já existe uma skill com esse nome.';
    }
    this.repository.create(data);
    return 'Skill criada com sucesso.';
  }
}
