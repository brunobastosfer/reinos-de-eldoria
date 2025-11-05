import { PartialType } from '@nestjs/mapped-types';
import { CreateMonsterDropDto } from './create-monster-drop.dto';

export class UpdateMonsterDropDto extends PartialType(CreateMonsterDropDto) {}
