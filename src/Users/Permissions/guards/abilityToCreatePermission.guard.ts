import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from 'src/Users/users.service';
import { PermissionsService } from '../permissions.service';

@Injectable()
export class AbilityToCreatePermissionGuard implements CanActivate {
  constructor(
    private readonly permissionsService: PermissionsService,
    private readonly usersService: UsersService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { session, params } = context.switchToHttp().getRequest();

    const sessionUserId = parseInt(session.userId);
    const paramsUserId = parseInt(params.userId);

    if (paramsUserId === sessionUserId) {
      throw new ConflictException('You can not create permission for yourself');
    }

    if (
      await this.permissionsService.count({
        where: [{ ownerId: sessionUserId, visitorId: paramsUserId }],
      })
    ) {
      throw new ConflictException('Permission already exists');
    }

    if (
      !(await this.usersService.count({
        where: { id: paramsUserId },
      }))
    ) {
      throw new NotFoundException();
    }
    return true;
  }
}
