

// https://github.com/typestack/class-validator#validation-decorators

import { isAlphanumeric, IsNotEmpty, Matches, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {

    @IsNotEmpty ()
    @MinLength (4)
    @MaxLength (10)
    username: string;

    @IsNotEmpty ()
    @MinLength (4)
    @MaxLength (40)
    @Matches (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
    email: string;

    @IsNotEmpty ()
    @MinLength (4)
    @MaxLength (45)
    @Matches (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/)
    password: string;
}