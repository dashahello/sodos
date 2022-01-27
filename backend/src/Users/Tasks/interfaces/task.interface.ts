export interface TaskInterface {
  id?: number;
  title: string;
  description: string;
  done: boolean;
  createdAt: Date;
  updatedAt: Date;
  owner: number;
  author: number;
  modifier: number | null;
}
