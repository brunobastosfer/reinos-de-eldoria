import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { ClasseRepository } from './repository/classe.repository';

@Injectable()
export class ClasseService {
  constructor(private readonly repository: ClasseRepository) {}

  async create(createClassDto: CreateClassDto) {
    const classes = await this.findAll();
    if (classes.length >= 4) {
      throw new BadRequestException('O jogo só pode ter 4 classes criadas.');
    }
    const classe = await this.repository.findByClassType(createClassDto.type);
    if (classe) {
      throw new BadRequestException('Já existe uma classe deste tipo.');
    }
    return await this.repository.create(createClassDto);
  }

  async findAll() {
    return await this.repository.findAll();
  }

  async findOne(id: string) {
    return await this.repository.findOne(id)
  }

  update(id: number, updateClassDto: UpdateClassDto) {
    return `This action updates a #${id} class`;
  }

  remove(id: number) {
    return `This action removes a #${id} class`;
  }
}
