import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class OwnerGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { session, params } = context.switchToHttp().getRequest();

    const sessionUserId = parseInt(session.userId);
    const paramsUserId = parseInt(params.userId);

    if (paramsUserId !== sessionUserId) {
      throw new UnauthorizedException('You do not have access');
    }

    return true;
  }
}
