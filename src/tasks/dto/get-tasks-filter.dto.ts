import { IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { TaskStatus } from "../task.model";

export class GetTaskFilterDto {

    @IsOptional ()
    @IsEnum (
        TaskStatus,
        {
            message: 'Status can be OPEN, IN_PROGRESS, DONE.'
        }
    )
    status: TaskStatus;

    @IsOptional ()
    @IsNotEmpty ()
    searchTerm: string;
}