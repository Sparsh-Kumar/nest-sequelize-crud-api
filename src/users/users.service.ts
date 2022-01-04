import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Users } from './models/users.model';
import { UserRepository } from './repositories/users.repository';

@Injectable()
export class UsersService {

    constructor (private userRepository: UserRepository) {}
    
    async createUser(createUserDto: CreateUserDto): Promise<Users> {
        return await this.userRepository.createNewUser(createUserDto);
    }
}
