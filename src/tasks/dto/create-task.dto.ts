

// https://github.com/typestack/class-validator#validation-decorators

import { ApiProduces, ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, MaxLength } from "class-validator";

export class CreateTaskDto {

    @IsNotEmpty ()
    @MaxLength (30)
    @ApiProperty()
    title: string;

    @IsNotEmpty ()
    @MaxLength (40)
    @ApiProperty()
    description: string;
}