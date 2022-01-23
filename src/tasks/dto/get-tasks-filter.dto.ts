import { ApiProduces, ApiProperty } from "@nestjs/swagger";
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
    @ApiProperty({ required: false })
    status: TaskStatus;

    @IsOptional ()
    @IsNotEmpty ()
    @ApiProperty({ required: false })
    searchTerm: string;
}