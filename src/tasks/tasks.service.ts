
import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './repositories/task.repository';
import { Tasks } from './models/tasks.model';
import { Users } from 'src/users/models/users.model';

@Injectable()
export class TasksService {

    constructor (private tasksRepository: TaskRepository) {}

    private tasks = [];

    async getAllTasks (user: Users): Promise <Tasks []> {
        return await this.tasksRepository.getAllTasks (user);
    }

    async getTaskById (
        id: string,
        user: Users
    ): Promise <Tasks> {
        return await this.tasksRepository.getTaskById (id, user);
    }

    async getTasksWithFilter (
        filterDto: GetTaskFilterDto,
        user: Users
    ): Promise <Tasks []> {
        return await this.tasksRepository.getTasksWithFilter (filterDto, user)
    }

    async createTask (
        createTaskDto: CreateTaskDto,
        user: Users
    ): Promise <Tasks> {
        return await this.tasksRepository.createNewTask (createTaskDto, user);
    }

    async deleteTask (
        id: string,
        user: Users
    ): Promise <void> {
        await this.tasksRepository.deleteTaskById (id, user);
    }


    async updateTaskStatus (
        id: string,
        status: TaskStatus,
        user: Users
    ): Promise <any> {
        return await this.tasksRepository.updateTaskStatus (id, status, user);
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
