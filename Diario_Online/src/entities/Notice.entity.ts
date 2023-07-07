import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  ManyToOne,
} from 'typeorm';
import { Image } from './Image.entity';

@Entity()
export class Notice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column()
  cuerpo: string;

  @Column()
  rutaImagen: string;

  @OneToOne(() => Image)
  imagen: Image;
}
