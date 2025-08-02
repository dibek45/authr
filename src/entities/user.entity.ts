
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Sorteo } from './sorteo.entity';
import { CuentaBancaria } from './cuenta-bancaria.entity';

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


  @OneToMany(() => Sorteo, sorteo => sorteo.admin)
  sorteos: Sorteo[];

  
  // Relación uno a muchos (un sorteo puede tener muchas cuentas bancarias)
  @OneToMany(() => CuentaBancaria, cuentaBancaria => cuentaBancaria.sorteo)
  cuentasBancarias: CuentaBancaria[];
}
