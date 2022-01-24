import { Permission } from '../permissions/entities/permission.entity';
import { Task } from '../tasks/entities/task.entity';

export interface UserInterface {
  id?: number;
  username: string;
  email?: string;
  password: string;
  createdAt: Date;
  tasks: Task[];
  permissions: Permission[];
}
