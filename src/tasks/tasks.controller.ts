import { Body, Controller, Get, Post, Param, Delete, Patch, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';

@Controller('tasks')
export class TasksController {
    
    constructor (private taskService: TasksService) {}

    @Get ()
    getTasks (@Query (ValidationPipe) getTasksFilterDto: GetTaskFilterDto): Task [] {
        if (Object.keys (getTasksFilterDto).length) {
            return this.taskService.getTasksWithFilter (getTasksFilterDto);
        } else {
            return this.taskService.getAllTasks ();
        }
    }

    @Get (':id')
    getTaskById (@Param ('id') id: string): Task {
        return this.taskService.getTaskById (id)
    }

    @Post ()
    @UsePipes (ValidationPipe)
    createTask (@Body () createTaskDto: CreateTaskDto): Task {
        return this.taskService.createTask (createTaskDto);
    }

    @Delete (':id')
    deleteTask (@Param ('id') id: string): void {
        this.taskService.deleteTask (id);
    }

    /*
    @Patch (':id/status')
    @UsePipes (ValidationPipe)
    updateTaskStatus (
        @Param ('id') id: string,
        @Body () updateTaskDto: UpdateTaskDto
    ): Task {
        return this.taskService.updateTaskStatus (id, updateTaskDto);
    }*/


    /** 
     * As you can see I am making use of 
     * custom validation pipe for validating the status value on update task controller
     * You can also make use of DTOs for that purpose, I have commented out the above controller
     * The above controller is making use of DTOs for validating the status value on updating the Task.
    */
   
    @Patch (':id/status')
    updateTaskStatus (
        @Param ('id') id: string,
        @Body ('status', TaskStatusValidationPipe) status: TaskStatus
    ): Task {
        return this.taskService.updateTaskStatus (id, status);
    }



}
