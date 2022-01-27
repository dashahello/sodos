import { Task } from '../Tasks/entities/task.entity';

export class UserResponseDto {
  readonly id?: number;
  readonly username?: string;
  readonly email?: string;
  readonly status?: string;
  readonly password?: string;
  readonly createdAt?: Date;
  readonly tasks: Task[];
  // photo

  constructor(data) {
    if (data) {
      this.id = data.id;
      this.username = data.username;
      this.email = data.email;
      this.createdAt = data.createdAt;
      this.status = data.status;
      this.tasks = data.tasks;
    }
  }
}
