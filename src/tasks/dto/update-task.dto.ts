
import { TaskStatus } from "../task.model";
import { IsEnum } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

// https://github.com/typestack/class-validator#validation-decorators

export class UpdateTaskDto {

    @IsEnum (TaskStatus)
    @ApiProperty()
    status: TaskStatus
}