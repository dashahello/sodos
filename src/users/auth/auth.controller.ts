import {
  Body,
  Controller,
  NotFoundException,
  Post,
  Session,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLoginDto } from './dto/user-login.dto';

@Controller('users/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(
    @Session() session: { loggedIn: boolean; userId: number | null },
    @Body() data: UserLoginDto,
  ) {
    const user = await this.authService.verifyUser(data);

    if (!user) {
      throw new NotFoundException(`No user found`);
    }

    session.loggedIn = true;
    session.userId = user.id;

    return { result: 'success' };
  }

  @Post('signup')
  signUp() {}

  @Post('logout')
  logOut(@Session() session: { loggedIn: boolean; userId: number | null }) {
    session.loggedIn = false;
    session.userId = null;

    return { result: 'success' };
  }
}
