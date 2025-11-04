import { Injectable } from "@nestjs/common";
import { SkillRepository } from "../skill.repository";
import { SkillCreateDto } from "src/skill/dto/skill.create.dto";

@Injectable()
export class SkillPrismaRepository implements SkillRepository{
    create(data: SkillCreateDto) {
        return true
    }
    findBySkill(skill: string) {
        return true
    }

}