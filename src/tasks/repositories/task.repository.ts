
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from '../dto/create-task.dto';
import { Task, TaskStatus } from '../task.model';
import { TASK_REPOSITORY } from '../constants';
import { Inject } from '@nestjs/common';
import { Tasks } from '../models/tasks.model';
import { GetTaskFilterDto } from '../dto/get-tasks-filter.dto';
import { Op } from 'sequelize';
import { Users } from 'src/users/models/users.model';


@Injectable ()
export class TaskRepository {
    
    constructor (@Inject (TASK_REPOSITORY) private readonly taskRepo: typeof Tasks) { }

    async createNewTask (
        createTaskDto: CreateTaskDto,
        user: Users
    ): Promise <Tasks> {

        const { title, description } = createTaskDto;
        const status = 'OPEN';
        const task = {
            title,
            description,
            status,
            userId: (user.toJSON() as Users).id
        }

        return await this.taskRepo.create (task)
    }

    async getTaskById (
        id: string,
        user: Users
    ): Promise <Tasks> {
        let Query: any = {};
        Query['id'] = id;
        Query['userId'] = (user.toJSON() as Users).id;
        const task = await this.taskRepo.findOne ({ where: Query });
        if (!task) {
            throw new NotFoundException (`Task with ID = ${id} not found`);
        }
        return task;
    }


    async getAllTasks (user: Users): Promise <Tasks []> {
        let Query: any = {};
        Query['userId'] = (user.toJSON() as Users).id;
        return await this.taskRepo.findAll ({ where: Query });
    }

    async getTasksWithFilter (
        filterDto: GetTaskFilterDto,
        user: Users
    ): Promise <Tasks []> {
        const { status, searchTerm } = filterDto;
        let Query: any = {};
        if (status) {
            Query['status'] = status;
        }
        if(searchTerm) {
            Query[Op.or] = [
                {
                    title: {
                        [Op.like]: `%${searchTerm}%`
                    }
                },
                {
                    description: {
                        [Op.like]: `%${searchTerm}%`
                    }
                }
            ]
        }
        Query['userId'] = (user.toJSON() as Users).id;
        const tasks = await this.taskRepo.findAll ({ where: Query });
        return tasks;
    }

    async deleteTaskById (
        id: string,
        user: Users
    ): Promise <void> {
        let Query: any = {};
        Query['id'] = id;
        Query['userId'] = (user.toJSON() as Users).id;
        await this.getTaskById (id, user);
        await this.taskRepo.destroy ({ where: Query });
    }


    async updateTaskStatus (
        id: string,
        status: TaskStatus,
        user: Users
    ): Promise <any> {
        let Query: any = {};
        Query['id'] = id;
        Query['userId'] = (user.toJSON() as Users).id;
        await this.getTaskById (id, user);
        return await this.taskRepo.update ({ status }, { where: Query });
    }
}
