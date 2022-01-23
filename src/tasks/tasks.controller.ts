import { Body, Controller, Get, Post, Param, Delete, Patch, Query, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Tasks } from './models/tasks.model';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/users/custom-decorators/get-user.decorator';
import { Users } from 'src/users/models/users.model';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    
    constructor (private taskService: TasksService) {}

    @Get ()
    async getTasks (
        @Query (ValidationPipe) getTasksFilterDto: GetTaskFilterDto,
        @GetUser() user: Users
    ): Promise <Tasks []> {
        if (Object.keys (getTasksFilterDto).length) {
            return await this.taskService.getTasksWithFilter (getTasksFilterDto, user);
        } else {
            return await this.taskService.getAllTasks (user);
        }
    }

    @Get (':id')
    async getTaskById (
        @Param ('id') id: string,
        @GetUser() user: Users
    ): Promise <Tasks> {
        return await this.taskService.getTaskById (id, user)
    }

    @Post ()
    @UsePipes (ValidationPipe)
    async createTask (
        @Body () createTaskDto: CreateTaskDto,
        @GetUser() user: Users
    ): Promise <Tasks> {
        return await this.taskService.createTask (createTaskDto, user);
    }

    @Delete (':id')
    async deleteTask (
        @Param ('id') id: string,
        @GetUser() user: Users
    ): Promise <void> {
        await this.taskService.deleteTask (id, user);
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
    async updateTaskStatus (
        @Param ('id') id: string,
        @Body ('status', TaskStatusValidationPipe) status: TaskStatus,
        @GetUser() user: Users,
    ): Promise <any> {
        return await this.taskService.updateTaskStatus (id, status, user);
    }

}
