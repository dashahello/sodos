import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async findAll(options?: object) {
    return await this.tasksRepository.find(options);
  }

  async findOneById(id: number, options?: object) {
    return await this.tasksRepository.findOne(id, options);
  }

  async count(options?: object) {
    return await this.tasksRepository.count(options);
  }

  async create(createTaskDto: CreateTaskDto) {
    return await this.tasksRepository.save(createTaskDto);
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<void> {
    await this.tasksRepository.update(id, updateTaskDto);
  }

  async remove(id: number) {
    await this.tasksRepository.delete(id);
  }
}
