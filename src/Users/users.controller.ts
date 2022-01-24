import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Session,
  UnauthorizedException,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserPreviewDto } from './dto/user-preview.dto';
import { UserProfileDto } from './dto/user-profile.dto';
import { IsAuthorizedGuard } from './Auth/guards/isAuthorized.guard';
import { PermissionsService } from './Permissions/permissions.service';

@Controller('users')
@UseGuards(IsAuthorizedGuard)
export class UsersController {
  constructor(
    // @TODO
    // find the way to check permissions
    // import PermissionsService
    private readonly usersService: UsersService, // private readonly permissionService: PermissionsService,
  ) {}

  @Get()
  async findAll() {
    const users = await this.usersService.findAll();
    return users.map((user) => new UserPreviewDto(user));
  }

  @Get(':userId')
  async findOne(
    @Session() session: { userId: number },
    @Param('userId', ParseIntPipe) id: string,
  ) {
    // @TODO
    // user can only view pforfile of other user if he is that user or he has permission

    const user = await this.usersService.findOne(id);

    return new UserProfileDto(user);
  }

  @Patch(':userId')
  async update(
    @Session() session: { userId: number },
    @Param('userId', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    if (id !== session.userId) {
      throw new UnauthorizedException();
    }

    await this.usersService.update(id, updateUserDto);

    return { result: 'success' };
  }
}
