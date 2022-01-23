import { Controller, Post, UsePipes, ValidationPipe, Body, UseGuards, Req } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { SignInUserDto } from './dto/signIn-user-dto';
import { UsersService } from './users.service';
import { Users } from './models/users.model';
import { JWTPayload } from './providers/users.providers';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './custom-decorators/get-user.decorator';
import { ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) {}

    @ApiOkResponse({
        description: 'Created user successfully.',
        type: Users
    })
    @ApiInternalServerErrorResponse({
        description: 'Internal server error.'
    })
    @Post('signup')
    @UsePipes(ValidationPipe)
    async signUp(@Body () createUserDto:CreateUserDto): Promise<Users> {
        return await this.userService.createUser(createUserDto);
    }

    @ApiOkResponse({
        description: 'Logged in successfully.',
        type: Users
    })
    @ApiInternalServerErrorResponse({
        description: 'Internal server error'
    })
    @Post('signin')
    @UsePipes(ValidationPipe)
    async signIn(@Body () signInUserDto: SignInUserDto): Promise<JWTPayload> {
        return await this.userService.signInUser(signInUserDto);
    }

    /*

    // You can also use @Req() req decorator in place of @GetUser decorator and log the value of req.user
    // to see that passport set up req.user value after decoding
     
    @Post('test')
    @UseGuards(AuthGuard())
    async test(@GetUser() user: Users): Promise<Users> {
        console.log('The user in the request is');
        console.log(user);
        return user;
    }
    */
}
