import { Rol } from '../enums/Rol';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column('enum', { enum: Rol, default: Rol.USER })
  rol: Rol;

  @Column()
  fechaAlta: Date;

  @Column()
  activo: boolean;

  getRol(): Rol {
    return this.rol;
  }
}
