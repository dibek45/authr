import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Usuario } from './user.entity';  // Relación con Usuario
import { Sorteo } from './sorteo.entity';  // Relación con Sorteo

@Entity()
export class CuentaBancaria {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  banco: string;

  @Column()
  numero: string;

  @Column()
  titular: string;

  // Relación muchos a uno con Usuario
  @ManyToOne(() => Usuario, usuario => usuario.cuentasBancarias)
  usuario: Usuario;

  @Column()
  usuarioId: number;  // Clave foránea que hace referencia a Usuario

  // Relación muchos a uno con Sorteo
@OneToMany(() => Sorteo, sorteo => sorteo.cuentaBancaria)
sorteos: Sorteo[];



}
