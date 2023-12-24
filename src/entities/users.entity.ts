import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Reviews } from './reviews.entity';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  password: string;

  @OneToMany(() => Reviews, (review) => review.user)
  review: Reviews[];
}
