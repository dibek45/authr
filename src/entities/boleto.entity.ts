
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Sorteo } from './sorteo.entity';


@Entity()
export class Boleto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  numero: number;

  @Column()
  precio: number;

  @Column({ default: 'disponible' })
  estado: string;

  @Column({ nullable: true })
  metodoPago: string;

  @Column({ nullable: true })
  fechaCompra: Date;


  @Column({ nullable: true })
  compradorId: number;


  @Column({ nullable: true })
  vendedorId: number;

  @ManyToOne(() => Sorteo, sorteo => sorteo.boletos)
  @JoinColumn({ name: 'sorteoId' })
  sorteo: Sorteo;

  @Column()
  sorteoId: number;
}
