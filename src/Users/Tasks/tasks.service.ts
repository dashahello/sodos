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
    // return this.tasksRepository.findOne(id, {
    //   // select: ['id'], fields to select from task
    //   relations: ['user'],
    // });

    // console.log('id', id);

    return await this.tasksRepository.findOne(id, options);

    // const t = await this.tasksRepository
    //   .createQueryBuilder('task')
    //   .leftJoinAndSelect('task.owner', 'user')
    //   .where('task.id = :taskId', { taskId: id })
    //   .select(['task.title', 'user.username'])
    //   .getOne();

    // console.log(t);

    // return t;
  }

  async create(createTaskDto: CreateTaskDto) {
    // const newTask = await this.tasksRepository
    //   .createQueryBuilder('task')
    //   .leftJoinAndSelect('task.author', 'user')
    //   .where('task.id = :taskId', { taskId: createTaskDto.owner })
    //   .select(['task.title', 'user.username'])
    //   .getOne();

    return await this.tasksRepository.save(createTaskDto);
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<void> {
    await this.tasksRepository.update(id, updateTaskDto);
  }

  async remove(id: number) {
    await this.tasksRepository.delete(id);
  }
}
