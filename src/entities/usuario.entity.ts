import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Usuario') // ⚠️ con mayúscula, porque así está en la DB
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  rol: string;
}
