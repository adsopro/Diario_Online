import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User.entity';

@Entity()
export class Admin extends User {
  @PrimaryGeneratedColumn()
  id: number;
}
