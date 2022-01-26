import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Session,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { IsAuthorizedGuard } from './Auth/guards/isAuthorized.guard';
import { HasAccessAuthGuard } from './guards/hasAccessAuth.guard';
import { OwnerGuard } from './guards/owner.guard.';
import { UserPreviewDto } from './dto/user.preview.dto';
import { UserResponseDto } from './dto/user.response.dto';
import { UserUpdateRequestDto } from './dto/user.updateRequest.dto';

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
  @UseGuards(HasAccessAuthGuard)
  async findOne(
    @Session() session: { userId: number },
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    // @TODO
    // user can only view pforfile of other user if he is that user or he has permission??

    const user = await this.usersService.findOne(userId);

    return new UserResponseDto(user);
  }

  @Patch(':userId')
  @UseGuards(OwnerGuard)
  async update(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() userRequest: UserUpdateRequestDto,
  ) {
    await this.usersService.update(userId, userRequest);
    return { result: 'success' };
  }
}
