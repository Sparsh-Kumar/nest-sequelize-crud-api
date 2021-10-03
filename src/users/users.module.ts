import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { userProviders } from './providers/users.providers';
import { UserRepository } from './repositories/users.repository';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UserRepository, ...userProviders],
  exports: [...userProviders]
})
export class UsersModule {}
