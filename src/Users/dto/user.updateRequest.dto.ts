import { PartialType } from '@nestjs/mapped-types';

import { UserCreateRequestDto } from '../Auth/dto/user.createRequest.dto';

export class UserUpdateRequestDto extends PartialType(UserCreateRequestDto) {}
