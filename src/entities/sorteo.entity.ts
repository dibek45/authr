import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Usuario } from './user.entity';
import { CuentaBancaria } from './cuenta-bancaria.entity';
import { Boleto } from './boleto.entity';


@Entity()
export class Sorteo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ nullable: true })
  descripcion: string;

  @Column()
  fecha: Date;

  // Relación muchos a uno con Usuario (un sorteo tiene un admin)
  @ManyToOne(() => Usuario, usuario => usuario.sorteos)
  @JoinColumn({ name: 'adminId' })
  admin: Usuario;

  @Column()
  adminId: number;

  // Relación uno a muchos (un sorteo puede tener muchas cuentas bancarias)
  @OneToMany(() => CuentaBancaria, cuentaBancaria => cuentaBancaria.sorteo)
  cuentasBancarias: CuentaBancaria[];

    // Define the OneToMany relation with Boleto
  @OneToMany(() => Boleto, (boleto) => boleto.sorteo)
  boletos: Boleto[];  // This defines the 'boletos' property
}
