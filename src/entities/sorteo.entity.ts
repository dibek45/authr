import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Usuario } from './usuario.entity';

@Entity({ name: 'Sorteo' }) // 👈 Usa exactamente este nombre con mayúscula inicial
export class Sorteo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ nullable: true })
  descripcion?: string;

  @Column({ nullable: true })
  imagen?: string;

  @Column()
  fecha: Date;

  @Column({ nullable: true })
  cierreVentas?: Date;

  @Column({ nullable: true, type: 'float' })
  costoBoleto?: number;

  @Column({ nullable: true })
  totalBoletos?: number;

  @Column({ nullable: true })
  boletosVendidos?: number;

  @Column({ nullable: true })
  estado?: string;

  @Column({ nullable: true })
  numeroWhatsApp?: string;

  @Column({ nullable: true })
  nombreEmpresa?: string;

  @Column({ nullable: true })
  linkfacebook?: string;

  @Column({ nullable: true })
  numeroCuenta?: string;

  @Column({ nullable: true })
  tipoBanco?: string;

  @Column({ nullable: true })
  numeroDeSorteo?: string;

  @Column({ nullable: true })
  mensajeWhatsappInfo?: string;

  @Column({ nullable: true })
  mensajeWhatsappApartado?: string;

  @Column({ nullable: true })
  mensajeWhatsappConfirmado?: string;

  @Column({ nullable: true })
  mensajeWhatsappAnuncio?: string;

  // 👇 Aquí lo que querías
  @Column({ name: 'adminId' }) // 👈 Este nombre debe coincidir con la columna SQL
  adminId: number;

  @ManyToOne(() => Usuario, (usuario) => usuario.sorteos)
  @JoinColumn({ name: 'adminId' }) // 👈 Forzar el nombre igual que en Prisma
  admin: Usuario;
}
