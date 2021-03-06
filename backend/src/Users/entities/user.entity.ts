import { Task } from 'src/Users/Tasks/entities/task.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Permission } from '../Permissions/entities/permission.entity';

@Entity()
@Unique('username', ['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, nullable: false, unique: false })
  username: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  email: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
    unique: false,
    select: false,
  })
  password: string;

  @Column({
    type: 'varchar',
    default: 'Happy to use Sodos :)',
    nullable: false,
    unique: false,
  })
  status: string;

  @CreateDateColumn({ update: false })
  createdAt: Date;

  @OneToMany(() => Task, (task) => task.owner, { eager: true, cascade: true })
  tasks: Task[];

  @OneToMany(() => Permission, (permission) => permission.owner, {
    eager: true,
    cascade: true,
  })
  permissionsFor: Permission[];

  @OneToMany(() => Permission, (permission) => permission.visitor, {
    eager: true,
    cascade: true,
  })
  permissionsTo: Permission[];
}
