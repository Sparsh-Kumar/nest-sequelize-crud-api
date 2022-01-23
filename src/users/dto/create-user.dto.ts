

// https://github.com/typestack/class-validator#validation-decorators

import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Matches, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {

    @IsNotEmpty ()
    @MinLength (4)
    @MaxLength (10)
    @ApiProperty()
    username: string;

    @IsNotEmpty ()
    @MinLength (4)
    @MaxLength (40)
    @Matches (
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        {
            message: 'Please enter a valid email !.'
        }
    )
    @ApiProperty()
    email: string;

    @IsNotEmpty ()
    @MinLength (4)
    @MaxLength (45)
    @Matches (
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
        {
            message: 'Password must contain a special character, a number, lowecase and uppercase letter !.'
        }
    )
    @ApiProperty()
    password: string;
}