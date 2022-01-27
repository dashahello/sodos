import {
  Injectable,
  CanActivate,
  ExecutionContext,
  NotFoundException,
} from '@nestjs/common';
import { TasksService } from '../tasks.service';

@Injectable()
export class TaskExistanceGuard implements CanActivate {
  constructor(private readonly taskService: TasksService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const taskId = parseInt(request.params.taskId);

    if (
      !(await this.taskService.count({
        where: { id: taskId },
      }))
    ) {
      throw new NotFoundException('Task not found');
    }

    return true;
  }
}
