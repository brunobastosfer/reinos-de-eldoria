import { PartialType } from '@nestjs/mapped-types';
import { CreateBlacksmithDto } from './create-blacksmith.dto';

export class UpdateBlacksmithDto extends PartialType(CreateBlacksmithDto) {}
