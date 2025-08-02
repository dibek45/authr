import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Usuario } from './user.entity';
import { Sorteo } from './sorteo.entity';


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
  @ManyToOne(() => Sorteo, sorteo => sorteo.cuentasBancarias)
  sorteo: Sorteo;

  @Column()
  sorteoId: number;  // Clave foránea que hace referencia a Sorteo



}
