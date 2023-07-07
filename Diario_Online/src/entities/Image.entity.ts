import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  mime: string;

  @Column()
  nombre: string;

  @Column('bytea')
  contenido: Buffer;
}
