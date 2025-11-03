import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    let nome = 'oioi';
    return nome
  }

  @Post()
  nome(): string {
    return 'n'
  }
}
