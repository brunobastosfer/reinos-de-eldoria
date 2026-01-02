import { Module } from '@nestjs/common';
import { BlacksmithService } from './blacksmith.service';
import { BlacksmithController } from './blacksmith.controller';

@Module({
  controllers: [BlacksmithController],
  providers: [BlacksmithService],
})
export class BlacksmithModule {}
