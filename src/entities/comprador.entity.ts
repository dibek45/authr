import { Boleto } from './boleto.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';

@Entity('comprador') // 👈 asegúrate que diga esto en minúsculas
export class Comprador {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  telefono: string;



 @Column({ name: 'creadoen' })
creadoEn: Date;


  @ManyToOne(() => Comprador, comprador => comprador.referidos, { nullable: true })
@JoinColumn({ name: 'referidoid' }) // 👈 igual que arriba
  referido: Comprador;

  @OneToMany(() => Comprador, comprador => comprador.referido)
  referidos: Comprador[];

@Column({ name: 'referidoid', nullable: true })  // 👈 forzar el nombre correcto
  referidoId: number;
}
