

// https://github.com/typestack/class-validator#validation-decorators

import { IsNotEmpty, MaxLength } from "class-validator";

export class CreateTaskDto {

    @IsNotEmpty ()
    @MaxLength (30)
    title: string;

    @IsNotEmpty ()
    @MaxLength (40)
    description: string;
}