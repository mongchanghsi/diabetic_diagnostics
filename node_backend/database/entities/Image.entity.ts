import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  // ManyToMany,
  // JoinTable,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { User } from './User.entity';

@Entity({ name: 'image' })
export class Image {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  name!: string;

  @Column()
  base64!: string;

  @ManyToOne(() => User, (user) => user.image)
  @JoinColumn({ name: 'user' })
  user!: User;
}
