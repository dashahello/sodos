import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  ConflictException,
  Session,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserPreviewDto } from './dto/user-preview.dto';
import { UserProfileDto } from './dto/user-profile.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(@Session() session: { loggedIn: boolean }) {
    if (session.loggedIn !== true) {
      throw new UnauthorizedException('Please log in first');
    }

    const users = await this.usersService.findAll();
    return users.map((user) => new UserPreviewDto(user));
  }

  // @TODO
  // returned type of each func

  @Get(':userId')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);

    return new UserProfileDto(user);
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    // @TODO
    // handle bad requests
    const newUser = await this.usersService.create(createUserDto);

    return new UserProfileDto(newUser);
  }

  @Put(':userId')
  async update(
    // @Session() session: { loggedIn: boolean },
    @Param('userId') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    // if(session.loggedIn !== true) {

    // }

    const user = await this.usersService.update(id, updateUserDto);

    return user;
  }

  // @Delete(':userId')
  // remove(@Param('userId') id: string) {
  //   return this.usersService.delete(id);
  // }
}
