
import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from '../dto/create-task.dto';
import { Task } from '../task.model';
import { TASK_REPOSITORY } from '../constants';
import { Inject } from '@nestjs/common';
import { Tasks } from '../models/tasks.model';


@Injectable ()
export class TaskRepository {
    
    constructor (@Inject (TASK_REPOSITORY) private readonly taskRepo: typeof Tasks) { }

    async createNewTask (createTaskDto: CreateTaskDto): Promise <Tasks> {

        const { title, description } = createTaskDto;
        const status = 'OPEN';
        const task = {
            title,
            description,
            status
        }

        return this.taskRepo.create (task)
    }
}