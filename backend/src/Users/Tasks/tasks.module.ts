import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { Task } from './entities/task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from '../Permissions/entities/permission.entity';
import { PermissionsService } from '../Permissions/permissions.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Permission]),
    TypeOrmModule.forFeature([Task]),
  ],
  controllers: [TasksController],
  providers: [PermissionsService, TasksService],
})
export class TasksModule {}
