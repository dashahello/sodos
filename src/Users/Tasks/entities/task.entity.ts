import { User } from 'src/Users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TaskStatus } from '../enums/status.enum';
import { TaskInterface } from '../interfaces/task.interface';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: TaskStatus;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  done: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.tasks)
  owner: User;
  @Column()
  ownerId: number;

  @ManyToOne(() => User)
  author: User;
  // @TODO
  // undo nullable when authorId will come from session
  @Column({ nullable: true })
  authorId: number;

  @ManyToOne(() => User)
  modifier: User;
  @Column({ nullable: true })
  modifierId: number;
}
