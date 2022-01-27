import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
  Session,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { IsAuthorizedGuard } from '../Auth/guards/isAuthorized.guard';
import { AccessToAllTasksGuard } from './guards/accessToAllTasks.guard';
import { AccessToSingleTaskGuard } from './guards/accessToSingleTask.guard';
import { TaskResponseDto } from './dto/task.response.dto';
import { TaskCreateRequestDto } from './dto/task.createRequest.dto';
import { TaskUpdateRequestDto } from './dto/task.updateRequest.dto';
import { TaskExistanceGuard } from './guards/taskExistance.guard';

@Controller('users/:userId/tasks')
@UseGuards(IsAuthorizedGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  @UseGuards(AccessToAllTasksGuard)
  async findAll(@Param('userId', ParseIntPipe) userId: number) {
    return await this.tasksService.findAll({
      where: { ownerId: userId },
    });
  }

  @Get(':taskId')
  @UseGuards(AccessToSingleTaskGuard, TaskExistanceGuard)
  async findOne(@Param('taskId') taskId: number) {
    return await this.tasksService.findOneById(taskId);
  }

  @Post()
  @UseGuards(AccessToAllTasksGuard)
  async create(
    @Session() session: { userId: number },
    @Param('userId', ParseIntPipe) userId: number,
    @Body() taskRequest: TaskCreateRequestDto,
  ) {
    const newTask = await this.tasksService.create(
      taskRequest,
      userId,
      session.userId,
    );

    return new TaskResponseDto(newTask);
  }

  @Patch(':taskId')
  @UseGuards(AccessToSingleTaskGuard, TaskExistanceGuard)
  async update(
    @Session() session: { userId: number },
    @Param('taskId', ParseIntPipe) taskId: number,
    @Body() taskRequestDto: TaskUpdateRequestDto,
  ) {
    this.tasksService.update(taskId, taskRequestDto, session.userId);

    return { result: 'success' };
  }

  @Delete(':taskId')
  @UseGuards(AccessToSingleTaskGuard, TaskExistanceGuard)
  async remove(@Param('taskId') taskId: number) {
    await this.tasksService.remove(taskId);
    return { result: 'success' };
  }
}
