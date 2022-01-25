import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { PermissionsService } from '../Permissions/permissions.service';

@Injectable()
export class HasAccessAuthGuard implements CanActivate {
  constructor(private readonly permissionService: PermissionsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { session, params } = context.switchToHttp().getRequest();

    const sessionUserId = parseInt(session.userId);
    const paramsUserId = parseInt(params.userId);

    if (paramsUserId === sessionUserId) {
      return true;
    }

    if (
      !(await this.permissionService.count({
        where: {
          ownerId: paramsUserId,
          visitorId: sessionUserId,
        },
      }))
    ) {
      throw new UnauthorizedException('You do not have access to this user');
    }

    return true;
  }
}
