import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MonsterService } from './monster/monster.service';
import { AccountService } from './account/account.service';
import { MonsterModule } from './monster/monster.module';
import { AccountModule } from './account/account.module';

@Module({
  imports: [MonsterModule, AccountModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
