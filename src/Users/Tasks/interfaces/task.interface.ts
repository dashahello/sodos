import { TaskStatus } from '../enums/status.enum';

export interface TaskInterface {
  id?: number;
  status: TaskStatus;
  title: string;
  description: string;
  done: boolean;
  createdAt: Date;
  updatedAt: Date;
  owner: number;
  author: number;
  modifier: number | null;
}
