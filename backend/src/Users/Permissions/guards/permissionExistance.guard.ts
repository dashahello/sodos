import {
  Injectable,
  CanActivate,
  ExecutionContext,
  NotFoundException,
} from '@nestjs/common';
import { PermissionsService } from '../permissions.service';

@Injectable()
export class PermissionExistanceGuard implements CanActivate {
  constructor(private readonly permissionsService: PermissionsService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { session, params } = context.switchToHttp().getRequest();

    const sessionUserId = parseInt(session.userId);
    const permissionId = parseInt(params.permissionId);
    const visitorId = parseInt(params.userId);

    if (
      !(await this.permissionsService.count({
        where: {
          id: permissionId,
          ownerId: sessionUserId,
          visitorId: visitorId,
        },
      }))
    ) {
      throw new NotFoundException('Permission not found');
    }

    return true;
  }
}
