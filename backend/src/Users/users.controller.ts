import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Session,
  UseGuards,
  ParseIntPipe,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { IsAuthorizedGuard } from './Auth/guards/isAuthorized.guard';
import { HasAccessAuthGuard } from './guards/hasAccessAuth.guard';
import { OwnerGuard } from './guards/owner.guard.';
import { UserPreviewDto } from './dto/user.preview.dto';
import { UserResponseDto } from './dto/user.response.dto';
import { UserUpdateRequestDto } from './dto/user.updateRequest.dto';

@Controller('users')
export class UsersController {
  constructor(
    // @TODO
    // find the way to check permissions
    // import PermissionsService
    private readonly usersService: UsersService, // private readonly permissionService: PermissionsService,
  ) {}

  @Get('current')
  async current(@Session() session: { userId: number; loggedIn: number }) {
    if (!session.userId || !session.loggedIn) {
      throw new UnauthorizedException('You are not logged in');
    }

    const user = await this.usersService.findOne(session.userId);

    return new UserResponseDto(user);
  }

  @Get()
  @UseGuards(IsAuthorizedGuard)
  async findAll() {
    const users = await this.usersService.findAll();
    return users.map((user) => new UserPreviewDto(user));
  }

  @Get(':userId')
  @UseGuards(IsAuthorizedGuard, HasAccessAuthGuard)
  async findOne(
    @Session() session: { userId: number },
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    // @TODO
    // user can only view profile of other user if he is that user or he has permission??

    const user = await this.usersService.findOne(userId, {
      relations: ['tasks'],
    });

    return new UserResponseDto(user);
  }

  // @TODO
  // password and other data validation on Patch

  // @TODO
  // hash HaSH

  @Patch(':userId')
  @UseGuards(IsAuthorizedGuard, OwnerGuard)
  async update(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() userRequest: UserUpdateRequestDto,
  ) {
    await this.usersService.update(userId, userRequest);
    return { result: 'success' };
  }
}
