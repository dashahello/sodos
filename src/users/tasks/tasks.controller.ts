import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Controller('users/:userId/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async findAll(@Param('userId') userId: number) {
    return await this.tasksService.findAll({
      where: { ownerId: userId },
      relations: ['owner'],
    });
  }

  @Get(':taskId')
  async findOne(@Param('userId') userId: number, @Param('taskId') id: number) {
    return await this.tasksService.findOneById(id);
  }

  @Post()
  async create(
    @Param('userId') userId: number,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    // @TODO
    // authorId and modifierId from session
    // createTaskDto.ownerId = userId;

    // const _createTaskDto: any = { ...createTaskDto };
    // _createTaskDto.ownerId = userId;

    createTaskDto.ownerId = userId;

    return await this.tasksService.create(createTaskDto);
  }

  @Put(':taskId')
  update(@Param('taskId') id: number, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':taskId')
  async remove(@Param('taskId') id: number) {
    return await this.tasksService.remove(id);
  }
}
