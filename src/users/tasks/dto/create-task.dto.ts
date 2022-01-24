import { TaskStatus } from '../enums/status.enum';

export class CreateTaskDto {
  readonly status: TaskStatus;
  readonly title: string;
  readonly description: string;
  readonly done: boolean;
  ownerId: number | undefined;
  // authorId: number | undefined;
  // modifierId: number | undefined;
}
