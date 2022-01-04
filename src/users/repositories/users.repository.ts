import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { USER_REPOSITORY } from "../constants";
import { CreateUserDto } from "../dto/create-user.dto";
import { Users } from "../models/users.model";
import { Op } from 'sequelize';
@Injectable ()
export class UserRepository {

    constructor (@Inject (USER_REPOSITORY) private readonly userRepo: typeof Users) {}

    async createNewUser(createUserDto: CreateUserDto): Promise<Users> {
        const {
            username,
            email,
            password
        } = createUserDto;
        const user = {
            username,
            email,
            password,
        };
        const userAlreadyExists = await this.userRepo.findOne(
            {
                where: {
                    [Op.or]: [
                        { username },
                        { email }
                    ]
                }
            }
        );
        if(userAlreadyExists) {
            throw new BadRequestException(`User with username = ${username}, or email = ${email} already exists`);
        }
        return await this.userRepo.create(user);
    }
    
}