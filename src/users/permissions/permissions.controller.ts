import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';

@Controller('users/:userId/permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  // @TODO
  // create dto fro returned value?
  @Get()
  async findAll(@Param('userId') userId: number) {
    return await this.permissionsService.findAll({
      where: [{ ownerId: userId }, { visitorId: userId }],

      // to get whole permission owner object
      // relations: ['owner'],
    });
  }

  @Get(':permissionId')
  async findOne(
    @Param('userId') userId: number,
    @Param('permissionId') id: number,
  ) {
    return await this.permissionsService.findOne(id, {
      where: [{ ownerId: userId }, { visitorId: userId }],
    });
  }

  @Post()
  async create(
    @Param('userId') userId: number,
    @Body() createPermissionDto: CreatePermissionDto,
  ) {
    createPermissionDto.ownerId = userId;

    return await this.permissionsService.create(createPermissionDto);
  }

  @Delete(':permissionId')
  async remove(
    @Param('userId') userId: number,
    @Param('permissionId') id: number,
  ) {
    // @TODO
    // implement this setup with sessionUserId
    // should only allow to delete if sessionId === permission owner id
    // const permissionToDelete = await this.permissionsService.findOne(id, {
    //   where: { ownerId: sessionUserId },
    // });

    // if (!permissionToDelete) {
    //   throw new HttpException('Forbiden', HttpStatus.FORBIDDEN);
    // }

    return this.permissionsService.remove(id);
  }
}
