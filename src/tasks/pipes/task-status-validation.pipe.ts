import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { TaskStatus } from "../task.model";

export class TaskStatusValidationPipe implements PipeTransform {


    private readonly allowStatus = [
        TaskStatus.OPEN,
        TaskStatus.IN_PROGRESS,
        TaskStatus.DONE
    ]

    transform (value: any, metadata: ArgumentMetadata) { // console.log (metadata)
        const isValid = this.isStatusValid (value);
        if (!isValid) {
            throw new BadRequestException (`Value = ${value} is not a valid status`);
        }
        return value;
    }

    private isStatusValid (status: any) {
        return this.allowStatus.includes (status);
    }
}