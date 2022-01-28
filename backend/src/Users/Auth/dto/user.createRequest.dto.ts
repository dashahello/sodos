import { Length, IsString, IsNotEmpty, IsEmail } from 'class-validator';

import { Permission } from 'src/Users/Permissions/entities/permission.entity';
import { Task } from 'src/Users/Tasks/entities/task.entity';

export class UserCreateRequestDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 20)
  readonly username?: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email?: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 20)
  readonly password?: string;

  readonly status?: string;

  readonly tasks?: Task[];
  readonly permissionsFor?: Permission[];
  readonly permissionsTo?: Permission[];
}
