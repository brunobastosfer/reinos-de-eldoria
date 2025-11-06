import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MonsterModule } from './monster/monster.module';
import { AccountModule } from './account/account.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';
import { CharacterModule } from './character/character.module';
import { ClasseModule } from './classe/classe.module';
import { DropModule } from './drop/drop.module';
import { ItemModule } from './item/item.module';
import { PlanModule } from './plan/plan.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MonsterModule,
    AccountModule,
    ClasseModule,
    CharacterModule,
    DropModule,
    ItemModule,
    PlanModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
