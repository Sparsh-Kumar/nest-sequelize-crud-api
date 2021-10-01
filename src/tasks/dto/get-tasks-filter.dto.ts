import { IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { TaskStatus } from "../task.model";

export class GetTaskFilterDto {

    @IsOptional ()
    @IsEnum (TaskStatus)
    status: TaskStatus;


    @IsOptional ()
    @IsNotEmpty ()
    searchTerm: string;
}