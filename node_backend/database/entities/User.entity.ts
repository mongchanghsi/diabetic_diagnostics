import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  // ManyToMany,
  // JoinTable,
  OneToMany,
} from 'typeorm';
import { Image } from './Image.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  nric!: string;

  @Column({ nullable: true })
  dateOfBirth!: Date;

  @Column({ nullable: true })
  height!: number;

  @Column({ nullable: true })
  weight!: number;

  @Column({ nullable: true })
  lastCheckUp!: Date;

  @Column()
  status!: boolean;

  @OneToMany(() => Image, (image) => image.user)
  image!: Image[];
}
