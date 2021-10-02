
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
    getAllTasks (): Task [] {
        return this.tasks;
    }

    getTaskById (id: string): Task {
        const found = this.tasks.find ((task) => task.id === id);
        if (!found) {
            throw new NotFoundException (`Task with ID = ${id} not found`);
        }
        return found;
    }

    getTasksWithFilter (filterDto: GetTaskFilterDto): Task [] {

        const { status, searchTerm } = filterDto;
        let tasks = this.getAllTasks ();

        if (status) {
            tasks = tasks.filter (task => task.status === status);
        }

        if (searchTerm) {
            tasks = tasks.filter ((task) => {
                return task.title.toLowerCase ().includes (searchTerm.toLowerCase ()) || task.description.toLowerCase ().includes (searchTerm.toLowerCase ());
            })
        }

        return tasks;

    }

    async createTask (createTaskDto: CreateTaskDto): Promise <Tasks> {
        return this.tasksRepository.createNewTask (createTaskDto);
    }

    deleteTask (id: string): void {

        const found = this.getTaskById (id);
        this.tasks = this.tasks.filter ((task) => task.id !== id);

    }

    /*
    updateTaskStatus (id: string, updateTaskDto: UpdateTaskDto): Task {
        
        const task = this.getTaskById (id);
        const { status } = updateTaskDto;
        task.status = status;
        return task;

    }
    */

    updateTaskStatus (id: string, status: TaskStatus): Task {

        const task = this.getTaskById (id);
        task.status = status;
        return task;

    }

}
