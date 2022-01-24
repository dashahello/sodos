import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from '../Auth/dto/user-signup.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  // readonly username: string;
  // readonly email: string;
  // readonly password: string;
  // readonly status: string;
}
