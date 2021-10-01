

// https://github.com/typestack/class-validator#validation-decorators

import { IsNotEmpty } from "class-validator";

export class CreateTaskDto {

    @IsNotEmpty ()
    title: string;

    @IsNotEmpty ()
    description: string;
}