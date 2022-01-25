import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Session,
  ConflictException,
  ParseIntPipe,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { IsAuthorizedGuard } from '../Auth/guards/isAuthorized.guard';

@Controller('users/:userId/permissions')
@UseGuards(IsAuthorizedGuard)
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  // @TODO
  // create dto for returned value?
  @Get()
  async findAll(
    @Session() session: { userId: number },
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    if (userId === session.userId) {
      return await this.permissionsService.findAll({
        where: [{ ownerId: session.userId }, { visitorId: session.userId }],
        relations: ['owner'],
        // should be done througn createQueryBuilder('user') in permissions service
      });
    }

    return await this.permissionsService.findAll({
      where: [
        { ownerId: session.userId, visitorId: userId },
        { ownerId: userId, visitorId: session.userId },
      ],
      relations: ['owner'],
    });
  }

  @Get(':permissionId')
  async findOne(
    @Session() session: { userId: number },
    @Param('userId', ParseIntPipe) userId: number,
    @Param('permissionId', ParseIntPipe) id: number,
  ) {
    if (userId === session.userId) {
      return await this.permissionsService.findOne(id, {
        where: [{ ownerId: session.userId }, { visitorId: session.userId }],
      });
    }

    await this.permissionsService.findOne(id, {
      where: [
        { ownerId: session.userId, visitorId: userId },
        { ownerId: userId, visitorId: session.userId },
      ],
    });
  }

  @Post()
  async create(
    @Session() session: { userId: number },
    @Param('userId', ParseIntPipe) userId: number,
    @Body() createPermissionDto: CreatePermissionDto,
  ) {
    if (userId === session.userId) {
      throw new ConflictException();
    }

    if (
      await this.permissionsService.count({
        where: [{ ownerId: session.userId, visitorId: userId }],
      })
    ) {
      throw new ConflictException('Permission already exists');
    }

    createPermissionDto.ownerId = session.userId;
    createPermissionDto.visitorId = userId;

    try {
      return await this.permissionsService.create(createPermissionDto);
    } catch (error) {
      if (error.code.includes('ER_NO_REFERENCED_ROW')) {
        throw new NotFoundException();
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  @Delete(':permissionId')
  async remove(
    @Session() session: { userId: number },
    @Param('userId', ParseIntPipe) userId: number,
    @Param('permissionId') id: number,
  ) {
    if (
      !(await this.permissionsService.findOne(id, {
        where: { ownerId: session.userId },
      }))
    ) {
      throw new NotFoundException();
    }

    await this.permissionsService.remove(id);
    return { result: 'success' };
  }
}
