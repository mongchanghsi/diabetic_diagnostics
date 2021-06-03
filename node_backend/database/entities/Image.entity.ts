import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { User } from './User.entity';

@Entity({ name: 'image' })
export class Image {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  nric!: string;

  @Column()
  an!: string;

  @Column()
  foot_left!: string;

  @Column()
  foot_right!: string;

  // @ManyToOne(() => User, (user) => user.image)
  // @JoinColumn({ name: 'user' })
  // user!: User;
}
