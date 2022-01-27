import { User } from 'src/Users/entities/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false, unique: false })
  title: string;

  @Column({ type: 'varchar', length: 250, nullable: false, unique: false })
  description: string;

  @Column({ type: 'bool', default: false, nullable: false })
  done: boolean;

  @CreateDateColumn({ update: false })
  createdAt: Date;

  @UpdateDateColumn({ update: true })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.tasks)
  owner: User;
  @Column({ type: 'number', nullable: false })
  ownerId: number;

  @ManyToOne(() => User)
  author: User;
  @Column({ type: 'number', nullable: false })
  authorId: number;

  @ManyToOne(() => User)
  modifier: User;
  @Column({ type: 'number', nullable: true })
  modifierId: number;
}
