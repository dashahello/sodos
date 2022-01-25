import { Module } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { Permission } from './entities/permission.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionsController } from './permissions.controller';
import { User } from '../entities/user.entity';
import { UsersService } from '../users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Permission]),
  ],
  controllers: [PermissionsController],
  providers: [UsersService, PermissionsService],
})
export class PermissionsModule {}
