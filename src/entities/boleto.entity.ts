import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Sorteo } from './sorteo.entity';

@Entity('boleto')  // 👈 tabla en minúsculas
export class Boleto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'numero' })
  numero: number;

  @Column({ name: 'precio', type: 'float' })
  precio: number;

  @Column({ name: 'estado', default: 'disponible' })
  estado: string;

  @Column({ name: 'metodopago', nullable: true })
  metodoPago?: string;

  @Column({ name: 'fechacompra', nullable: true, type: 'timestamp' })
  fechaCompra?: Date;

  @Column({ name: 'sorteoid' })
  sorteoId: number;

  @Column({ name: 'compradorid', nullable: true })
  compradorId?: number;

  @Column({ name: 'vendedorid', nullable: true })
  vendedorId?: number;

  @ManyToOne(() => Sorteo, sorteo => sorteo.boletos)
  @JoinColumn({ name: 'sorteoid' })
  sorteo: Sorteo;

}
