import { BadRequestException, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { USER_REPOSITORY } from "../constants";
import { CreateUserDto } from "../dto/create-user.dto";
import { Users } from "../models/users.model";
import { Op } from 'sequelize';
import * as bcrypt from 'bcrypt';
import { SignInUserDto } from "../dto/signIn-user-dto";
@Injectable ()
export class UserRepository {

    constructor (@Inject (USER_REPOSITORY) private readonly userRepo: typeof Users) {}

    async createNewUser(createUserDto: CreateUserDto): Promise<Users> {
        const {
            username,
            email,
            password
        } = createUserDto;
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
        const salt = await bcrypt.genSalt();
        const encryptedPassword = await this.hashPassword(password, salt);
        const user = {
            username,
            email,
            password: encryptedPassword,
            salt
        };
        return await this.userRepo.create(user);
    }

    async hashPassword(password: string, salt: string): Promise<string> {
        return await bcrypt.hash(password, salt);
    }
    
    async validateCredentials(signInUserDto: SignInUserDto): Promise<void | Users> {
        const {
            username,
            password
        } = signInUserDto;
        const isUserExist = await this.userRepo.findOne(
            {
                where: {
                    username
                }
            }
        );
        if(
            !isUserExist ||
            !await isUserExist.validatePassword(password)
        ) {
            throw new UnauthorizedException('Username/Password incorrect !.');
        }
        return isUserExist;
    }
}
