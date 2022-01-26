import { PartialType } from '@nestjs/mapped-types';

import { TaskCreateRequestDto } from './task.createRequest.dto';

export class TaskUpdateRequestDto extends PartialType(TaskCreateRequestDto) {}
