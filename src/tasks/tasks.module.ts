import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { taskProviders } from './providers/tasks.providers';
import { TaskRepository } from './repositories/task.repository';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    UsersModule
  ],
  controllers: [TasksController],
  providers: [TasksService, TaskRepository, ...taskProviders],
  exports: [...taskProviders]
})
export class TasksModule {}
