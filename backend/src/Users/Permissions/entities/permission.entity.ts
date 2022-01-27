import { User } from 'src/Users/entities/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

// @TODO
// implement interfaces properly with many to one columns
@Entity()
export class Permission extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // @ManyToOne(() => User, (user) => user.permissionsFor)
  @ManyToOne(() => User)
  // @JoinColumn()
  owner: User;

  @Column({ nullable: false })
  ownerId: number;

  @ManyToOne(() => User, (user) => user.permissionsTo)
  visitor: User;

  // @TODO
  // fix nullable: true when sessions are set up
  @Column({ nullable: false })
  visitorId: number;
}
