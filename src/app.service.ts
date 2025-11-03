import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World! 2';
  }
  getNome(): string {
    return 'Lucas'
  }
}
