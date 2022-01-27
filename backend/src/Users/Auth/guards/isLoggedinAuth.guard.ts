import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ConflictException,
} from '@nestjs/common';

@Injectable()
export class IsLoggedinAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    if (request.session.loggedIn === true) {
      throw new ConflictException(
        'Cannot login whilst already being logged in',
      );
    }

    return true;
  }
}
