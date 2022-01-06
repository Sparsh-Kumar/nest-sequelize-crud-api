import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JWTPayload } from './providers/users.providers';
import { CreateUserDto } from './dto/create-user.dto';
import { SignInUserDto } from './dto/signIn-user-dto';
import { Users } from './models/users.model';
import { UserRepository } from './repositories/users.repository';

@Injectable()
export class UsersService {

    constructor (
        private userRepository: UserRepository,
        private jwtService: JwtService,
    ) { }
    
    async createUser(createUserDto: CreateUserDto): Promise<Users> {
        return await this.userRepository.createNewUser(createUserDto);
    }

    async signInUser(signInUserDto: SignInUserDto): Promise<JWTPayload> {
        const userInfo = await this.userRepository.validateCredentials(signInUserDto);
        const accessToken = await this.jwtService.sign({ id: (userInfo as Users).id });
        return { accessToken };
    }
}
