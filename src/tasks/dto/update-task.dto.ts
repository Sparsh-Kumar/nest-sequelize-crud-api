
import { TaskStatus } from "../task.model";
import { IsEnum } from "class-validator";

// https://github.com/typestack/class-validator#validation-decorators

export class UpdateTaskDto {

    @IsEnum (TaskStatus)
    status: TaskStatus
}