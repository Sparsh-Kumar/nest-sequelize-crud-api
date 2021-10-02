
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from '../dto/create-task.dto';
import { Task, TaskStatus } from '../task.model';
import { TASK_REPOSITORY } from '../constants';
import { Inject } from '@nestjs/common';
import { Tasks } from '../models/tasks.model';
import { GetTaskFilterDto } from '../dto/get-tasks-filter.dto';
import { Op } from 'sequelize';


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

        return await this.taskRepo.create (task)
    }

    async getTaskById (id: string): Promise <Tasks> {
        const task = await this.taskRepo.findOne ({ where: { id } });
        if (!task) {
            throw new NotFoundException (`Task with ID = ${id} not found`);
        }
        return task;
    }


    async getAllTasks (): Promise <Tasks []> {
        return await this.taskRepo.findAll ({});
    }


    async getTasksWithFilter (filterDto: GetTaskFilterDto): Promise <Tasks []> {
        
        const { status, searchTerm } = filterDto;
        let query = { status: '', $or: {} }

        if (status) {
            query.status = status;
        }

        /*
        if (searchTerm) {
            query.$or = [
                { title: { [Op.like]: `%${searchTerm}%` } },
                { description: { [Op.like]: `%${searchTerm}%` } }
            ]
        }*/

        const tasks = await this.taskRepo.findAll ({ where: query });
        return tasks;
    }

    async deleteTaskById (id: string): Promise <void> {
        await this.getTaskById (id);
        await this.taskRepo.destroy ({ where: { id }});
    }


    async updateTaskStatus (id: string, status: TaskStatus): Promise <any> {
        await this.getTaskById (id);
        return await this.taskRepo.update ({ status }, { where: { id } });
    }

}