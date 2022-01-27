import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from './Permissions/entities/permission.entity';
import { PermissionsService } from './Permissions/permissions.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Permission]),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [UsersController],
  providers: [PermissionsService, UsersService],
})
export class UsersModule {}
