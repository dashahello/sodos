import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PermissionInterface } from '../interfaces/permisson.interface';

@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  // @ManyToOne(() => User, (user) => user.permissions)
  // // @JoinColumn()
  // user: User;

  // @Column()
  // userId: number;

  // @ManyToOne(() => User, (user) => user.permissionsFor)
  @ManyToOne(() => User)
  // @JoinColumn()
  owner: User;

  @Column()
  ownerId: number;

  @ManyToOne(() => User, (user) => user.permissionsTo)
  visitor: User;

  // @TODO
  // fix nullable: true when sessions are set up
  @Column({ nullable: true })
  visitorId: number;
}
