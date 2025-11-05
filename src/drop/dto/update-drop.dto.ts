import { PartialType } from '@nestjs/mapped-types';
import { CreateDropDto } from './create-monster-drop.dto';

export class UpdateDropDto extends PartialType(CreateDropDto) {}
