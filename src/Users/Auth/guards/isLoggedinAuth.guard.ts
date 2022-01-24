import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class IsLoggedinAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    if (request.session.loggedIn === true) {
      return false;
    }

    return true;
  }
}
