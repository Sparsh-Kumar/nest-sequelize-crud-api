
import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './repositories/task.repository';
import { Tasks } from './models/tasks.model';

@Injectable()
export class TasksService {

    constructor (private tasksRepository: TaskRepository) {}

    private tasks = [];

    async getAllTasks (): Promise <Tasks []> {
        return await this.tasksRepository.getAllTasks ();
    }

    async getTaskById (id: string): Promise <Tasks> {
        return await this.tasksRepository.getTaskById (id);
    }

    async getTasksWithFilter (filterDto: GetTaskFilterDto): Promise <Tasks []> {
        return await this.tasksRepository.getTasksWithFilter (filterDto)
    }

    async createTask (createTaskDto: CreateTaskDto): Promise <Tasks> {
        return await this.tasksRepository.createNewTask (createTaskDto);
    }

    async deleteTask (id: string): Promise <void> {
        await this.tasksRepository.deleteTaskById (id);
    }


    async updateTaskStatus (id: string, status: TaskStatus): Promise <any> {
        return await this.tasksRepository.updateTaskStatus (id, status);
    }


    /*
    updateTaskStatus (id: string, updateTaskDto: UpdateTaskDto): Task {
        
        const task = this.getTaskById (id);
        const { status } = updateTaskDto;
        task.status = status;
        return task;

    }
    */

}
