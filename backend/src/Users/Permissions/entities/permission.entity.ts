import { User } from 'src/Users/entities/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Permission extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  owner: User;

  @Column({ nullable: false })
  ownerId: number;

  @ManyToOne(() => User, (user) => user.permissionsTo)
  visitor: User;

  @Column({ nullable: false })
  visitorId: number;
}
