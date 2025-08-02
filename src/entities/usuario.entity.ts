import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Sorteo } from './sorteo.entity';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: 'admin' })
  rol: string;

  @OneToMany(() => Sorteo, (sorteo) => sorteo.admin)
  sorteos: Sorteo[];
}
