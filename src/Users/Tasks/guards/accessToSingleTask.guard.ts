import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { PermissionsService } from 'src/Users/Permissions/permissions.service';
import { TasksService } from '../tasks.service';

@Injectable()
export class AccessToSingleTaskGuard implements CanActivate {
  constructor(
    private readonly tasksService: TasksService,
    private readonly permissionService: PermissionsService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { session, params } = context.switchToHttp().getRequest();

    const sessionUserId = parseInt(session.userId);
    const paramsUserId = parseInt(params.userId);
    const paramsTaskId = parseInt(params.taskId);

    if (
      paramsUserId === sessionUserId &&
      (await this.tasksService.count({
        where: { id: paramsTaskId, ownerId: paramsUserId },
      }))
    ) {
      return true;
    }

    if (
      !(await this.permissionService.count({
        where: { ownerId: paramsUserId, visitorId: sessionUserId },
      }))
    ) {
      // @TODO
      // user should get not found if he goes to his account/permissions/:permissionId which does't exist
      throw new UnauthorizedException('You do not have access');
    }
    return true;
  }
}
