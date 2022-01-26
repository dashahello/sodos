import {
  Body,
  ConflictException,
  Controller,
  InternalServerErrorException,
  Post,
  Session,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { UserResponseDto } from '../dto/user.response.dto';
import { AuthService } from './auth.service';
import { UserCreateRequestDto } from './dto/user.createRequest.dto';
import { UserLoginDto } from './dto/user.login.dto';
import { IsLoggedinAuthGuard } from './guards/isLoggedinAuth.guard';

@Controller('users/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UseGuards(IsLoggedinAuthGuard) // so user can not login untill user logs out
  async login(
    @Session() session: { loggedIn: boolean; userId: number | null },
    @Body() userLoginRequest: UserLoginDto,
  ) {
    const user = await this.authService.verifyUser(userLoginRequest);

    if (!user) {
      throw new UnauthorizedException(`Incorrect credentials`);
    }

    session.loggedIn = true;
    session.userId = user.id;

    return { result: 'success' };
  }

  @Post('signup')
  @UseGuards(IsLoggedinAuthGuard) // so user can not signup (create a different account) untill user logs out
  async signUp(@Body() userRequest: UserCreateRequestDto) {
    try {
      const newUser = await this.authService.create(userRequest);
      return new UserResponseDto(newUser);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Userername or email alredy exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  @Post('logout')
  // @UseGuards(IsAuthorizedGuard) // so user can not logout if he is not logged in
  logOut(@Session() session: { loggedIn: boolean; userId: number | null }) {
    session.loggedIn = false;
    session.userId = null;

    return { result: 'success' };
  }
}
