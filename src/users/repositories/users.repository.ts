import { Inject, Injectable } from "@nestjs/common";
import { USER_REPOSITORY } from "../constants";
import { Users } from "../models/users.model";


@Injectable ()
export class UserRepository {

    constructor (@Inject (USER_REPOSITORY) private readonly userRepo: typeof Users) {}
    
}