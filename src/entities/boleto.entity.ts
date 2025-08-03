
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Sorteo } from './sorteo.entity';
import { Comprador } from './comprador.entity';
import { Vendedor } from './vendedor.entity';

@Entity('boleto')  // 👈 tabla en minúsculas
export class Boleto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  numero: number;

  @Column('float')
  precio: number;

  @Column({ default: 'disponible' })
  estado: string;

  @Column({ name: 'metodopago', nullable: true })  // 👈 así le dices el nombre real de la columna
metodoPago?: string;
@Column({ name: 'fechacompra', nullable: true, type: 'timestamp' })
fechaCompra?: Date;


  @ManyToOne(() => Sorteo, sorteo => sorteo.boletos)
  @JoinColumn({ name: 'sorteoId' }) // 👈 CLAVE
  sorteo: Sorteo;

  @ManyToOne(() => Comprador, comprador => comprador.boletos, { nullable: true })
  @JoinColumn({ name: 'compradorId' }) // 👈 CLAVE
  comprador?: Comprador;

  @ManyToOne(() => Vendedor, vendedor => vendedor.boletos, { nullable: true })
  @JoinColumn({ name: 'vendedorId' }) // 👈 CLAVE
  vendedor?: Vendedor;
}
