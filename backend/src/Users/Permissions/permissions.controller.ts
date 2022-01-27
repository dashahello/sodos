import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Session,
  ParseIntPipe,
} from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { IsAuthorizedGuard } from '../Auth/guards/isAuthorized.guard';
import { PermissionExistanceGuard } from './guards/permissionExistance.guard';
import { AbilityToCreatePermissionGuard } from './guards/abilityToCreatePermission.guard';
import { OwnerGuard } from '../guards/owner.guard.';
import { PermissionRequestnDto } from './dto/permission.request.dto';
import { PermissionResponseDto } from './dto/permission.response.dto';

@Controller('users/:userId/permissions')
@UseGuards(IsAuthorizedGuard)
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  // @TODO
  // create dto for returned value?
  @Get()
  @UseGuards(OwnerGuard)
  async findAll(
    @Session() session: { userId: number },
  ): Promise<PermissionResponseDto[]> {
    const permissions = await this.permissionsService.findAll({
      where: [{ ownerId: session.userId }, { visitorId: session.userId }],
    });

    return permissions.map(
      (permission) => new PermissionResponseDto(permission),
    );
  }

  // Currently has no use
  // @Get(':permissionId')
  // @UseGuards(OwnerGuard, PermissionExistanceGuard)
  // async findOne(
  //   @Session() session: { userId: number },
  //   @Param('permissionId', ParseIntPipe) permissionId: number,
  // ): Promise<PermissionResponseDto> {
  //   const permission = await this.permissionsService.findOne(permissionId, {
  //     where: [
  //       { id: permissionId, ownerId: session.userId },
  //       { id: permissionId, visitorId: session.userId },
  //     ],
  //   });

  //   return new PermissionResponseDto(permission);
  // }

  @Post()
  @UseGuards(AbilityToCreatePermissionGuard)
  async create(
    @Session() session: { userId: number },
    @Param('userId', ParseIntPipe) userId: number,
    @Body() permissionRequest: PermissionRequestnDto,
  ): Promise<PermissionResponseDto> {
    const newPermission = await this.permissionsService.create(
      permissionRequest,
      session.userId,
      userId,
    );

    return new PermissionResponseDto(newPermission);
  }

  @Delete(':permissionId')
  @UseGuards(PermissionExistanceGuard)
  async remove(@Param('permissionId') permissionId: number) {
    await this.permissionsService.remove(permissionId);
    return { result: 'success' };
  }
}
