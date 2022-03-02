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
import { ApiBearerAuth, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiTags('task')
@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    
    constructor (private taskService: TasksService) {}

    @ApiOkResponse({
        description: 'Get tasks successfully!.',
        type: Tasks
    })
    @ApiInternalServerErrorResponse({
        description: 'Internal server error.'
    })
    @ApiUnauthorizedResponse({
        description: 'Unauthorized error.'
    })
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

    @ApiOkResponse({
        description: 'Get Individual task successfully!.',
        type: Tasks
    })
    @ApiInternalServerErrorResponse({
        description: 'Internal server error.'
    })
    @ApiUnauthorizedResponse({
        description: 'Unauthorized error.'
    })
    @ApiNotFoundResponse({
        description: 'Task with given id not found.'
    })
    @Get (':id')
    async getTaskById (
        @Param ('id') id: string,
        @GetUser() user: Users
    ): Promise <Tasks> {
        return await this.taskService.getTaskById (id, user)
    }

    @ApiOkResponse({
        description: 'Created task successfully !.',
        type: Tasks
    })
    @ApiInternalServerErrorResponse({
        description: 'Internal server error.'
    })
    @ApiUnauthorizedResponse({
        description: 'Unauthorized error.'
    })
    @Post ()
    @UsePipes (ValidationPipe)
    async createTask (
        @Body () createTaskDto: CreateTaskDto,
        @GetUser() user: Users
    ): Promise <Tasks> {
        return await this.taskService.createTask (createTaskDto, user);
    }

    @ApiOkResponse({
        description: '',
        type: Tasks
    })
    @ApiInternalServerErrorResponse({
        description: 'Internal server error.'
    })
    @ApiUnauthorizedResponse({
        description: 'Unauthorized error.'
    })
    @ApiNotFoundResponse({
        description: 'Task with Id not found.'
    })
    @Delete (':id')
    async deleteTask (
        @Param ('id') id: string,
        @GetUser() user: Users
    ): Promise <void> {
        await this.taskService.deleteTask (id, user);
    }

    /*
    @Patch (':id/status')
    updateTaskStatus (
        @Param ('id') id: string,
        @Body ('status', TasksStatusValidationPipe) status: TaskStatus,
    ): Task {
        return this.taskService.updateTaskStatus (id, updateTaskDto);
    }*/


    /** 
     * As you can see I am making use of 
     * custom validation pipe for validating the status value on update task controller
     * You can also make use of DTOs for that purpose, You can see the above controller making use of 
     * Custom Pipes to validate status param in Body.
    */
   
    @ApiOkResponse({
        description: 'Updated task successfully !.',
        type: Tasks
    })
    @ApiInternalServerErrorResponse({
        description: 'Internal server error.'
    })
    @ApiUnauthorizedResponse({
        description: 'Unauthorized error.'
    })
    @ApiNotFoundResponse({
        description: 'Task with Id not found.'
    })
    @Patch (':id/status')
    async updateTaskStatus(
        @Param('id') id: string,
        @Body() updateTaskDto: UpdateTaskDto,
        @GetUser() user: Users
    ): Promise<Tasks> {
        return await this.taskService.updateTaskStatus(id, updateTaskDto, user)
    }

}
