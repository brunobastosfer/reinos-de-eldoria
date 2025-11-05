import { SkillCreateDto } from "../dto/skill.create.dto";

export abstract class SkillRepository {
abstract create(data: SkillCreateDto): any
abstract findBySkill(skill: string): any
}
