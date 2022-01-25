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
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { IsAuthorizedGuard } from '../Auth/guards/isAuthorized.guard';
import { AccessToAllTasksGuard } from './guards/accessToAllTasks.guard';
import { AccessToSingleTaskGuard } from './guards/accessToSingleTask.guard';

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
  @UseGuards(AccessToSingleTaskGuard)
  async findOne(@Param('taskId') taskId: number) {
    return await this.tasksService.findOneById(taskId);
  }

  @Post()
  @UseGuards(AccessToAllTasksGuard)
  async create(
    @Session() session: { userId: number },
    @Param('userId', ParseIntPipe) userId: number,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    createTaskDto.ownerId = userId;
    createTaskDto.authorId = session.userId;
    createTaskDto.modifierId = null;
    return await this.tasksService.create(createTaskDto);
  }

  @Patch(':taskId')
  @UseGuards(AccessToSingleTaskGuard)
  async update(
    @Session() session: { userId: number },
    @Param('taskId', ParseIntPipe) taskId: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    updateTaskDto.modifierId = session.userId;

    await this.tasksService.update(taskId, updateTaskDto);

    return { result: 'success' };
  }

  @Delete(':taskId')
  @UseGuards(AccessToSingleTaskGuard)
  async remove(@Param('taskId') taskId: number) {
    await this.tasksService.remove(taskId);
    return { result: 'success' };
  }
}
