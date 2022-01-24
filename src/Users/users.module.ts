import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionsModule } from './Permissions/permissions.module';
import { PermissionsService } from './Permissions/permissions.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), PermissionsModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
