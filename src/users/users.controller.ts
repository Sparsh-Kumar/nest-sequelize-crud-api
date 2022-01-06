import { Controller, Post, UsePipes, ValidationPipe, Body } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { SignInUserDto } from './dto/signIn-user-dto';
import { UsersService } from './users.service';
import { Users } from './models/users.model';
import { JWTPayload } from './providers/users.providers';
@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) {}

    @Post('signup')
    @UsePipes(ValidationPipe)
    async signUp(@Body () createUserDto:CreateUserDto): Promise<Users> {
        return await this.userService.createUser(createUserDto);
    }

    @Post('signin')
    @UsePipes(ValidationPipe)
    async signIn(@Body () signInUserDto: SignInUserDto): Promise<JWTPayload> {
        return await this.userService.signInUser(signInUserDto);
    }
}
