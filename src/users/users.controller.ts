import { Controller, Post, UsePipes, ValidationPipe, Body } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { Users } from './models/users.model';
@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) {}

    @Post()
    @UsePipes(ValidationPipe)
    async createUser(@Body () createUserDto:CreateUserDto): Promise<Users> {
        return await this.userService.createUser(createUserDto);
    }
}
