import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { userProviders } from './providers/users.providers';
import { UserRepository } from './repositories/users.repository';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: parseInt(process.env.JWT_SECRET_LIFETIME)
      }
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, UserRepository, ...userProviders],
  exports: [...userProviders]
})
export class UsersModule {}
