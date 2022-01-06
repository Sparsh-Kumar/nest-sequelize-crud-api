

import { USER_REPOSITORY } from "../constants";
import { Users } from "../models/users.model";

export const userProviders = [{
    provide: USER_REPOSITORY,
    useValue: Users
}]

export interface JWTPayload {
    accessToken: string;
}