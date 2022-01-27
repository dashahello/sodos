import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { UsersModule } from './Users/users.module';
import { PermissionsModule } from './Users/Permissions/permissions.module';
import { TasksModule } from './Users/Tasks/tasks.module';
import { AuthModule } from './Users/Auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UsersModule,
    TasksModule,
    PermissionsModule,
    AuthModule,
  ],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
