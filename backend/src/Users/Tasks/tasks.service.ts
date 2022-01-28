import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskCreateRequestDto } from './dto/task.createRequest.dto';
import { TaskUpdateRequestDto } from './dto/task.updateRequest.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async findAll(options?: object): Promise<Task[]> {
    return await this.tasksRepository.find(options);
  }

  async findOneById(id: number): Promise<Task> {
    return await this.tasksRepository
      .createQueryBuilder('task')
      .leftJoinAndSelect('task.owner', 'owner')
      .leftJoinAndSelect('task.author', 'author')
      .leftJoinAndSelect('task.modifier', 'modifier')
      .where('task.id = :taskId', { taskId: id })
      .select([
        'task',
        'owner.username',
        'author.username',
        'modifier.username',
      ])
      .getOne();
  }

  async count(options?: object): Promise<number> {
    return await this.tasksRepository.count(options);
  }

  async create(
    taskRequest: TaskCreateRequestDto,
    ownerId: number,
    authorId: number,
  ): Promise<Task> {
    taskRequest.ownerId = ownerId;
    taskRequest.authorId = authorId;
    taskRequest.modifierId = null;
    return await this.tasksRepository.save(taskRequest);
  }

  async update(
    id: number,
    taskRequest: TaskUpdateRequestDto,
    modifierId: number,
  ): Promise<void> {
    taskRequest.modifierId = modifierId;
    await this.tasksRepository.update(id, taskRequest);
  }

  async remove(id: number): Promise<void> {
    await this.tasksRepository.delete(id);
  }
}
