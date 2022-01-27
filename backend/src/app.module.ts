import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './Users/users.module';
import { PermissionsModule } from './Users/Permissions/permissions.module';
import { TasksModule } from './Users/Tasks/tasks.module';
import { AuthModule } from './Users/Auth/auth.module';
import { HttpRequestLogger } from './middlewares/httpRequestLogger.middleware';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UsersModule,
    TasksModule,
    PermissionsModule,
    AuthModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpRequestLogger).forRoutes('*');
  }
}
