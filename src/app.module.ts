import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TasksModule,
    DatabaseModule,
    ConfigModule.forRoot ({ isGlobal: true }),
    UsersModule
  ],
})

export class AppModule {}
