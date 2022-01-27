import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class IsAuthorizedGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    if (!request.session.loggedIn || request.session.loggedIn === false) {
      console.log('zzzzzzzz');

      return false;
    }

    return true;
  }
}
