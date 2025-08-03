import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Boleto } from './boleto.entity';
import { CuentaBancaria } from './cuenta-bancaria.entity';
import { Usuario } from './user.entity';

@Entity("Sorteo")  // 👈 exactamente igual que el nombre en tu DB
export class Sorteo {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'nombre' })
  nombre: string;

  @Column({ name: 'descripcion', nullable: true })
  descripcion?: string;

  @Column({ name: 'imagen', nullable: true })
  imagen?: string;

  @Column({ name: 'fecha', type: 'timestamp' })
  fecha: Date;

  @Column({ name: 'cierreventas', type: 'timestamp', nullable: true })
  cierreVentas: Date | null;

  @Column('float', { name: 'costoboleto', nullable: true })
  costoBoleto?: number;

  @Column({ name: 'totalboletos', nullable: true })
  totalBoletos?: number;

  @Column({ name: 'boletosvendidos', nullable: true })
  boletosVendidos?: number;

  @Column({ name: 'estado', nullable: true })
  estado?: string;

  @Column({ name: 'numerowhatsapp', nullable: true })
  numeroWhatsApp?: string;

  @Column({ name: 'nombreempresa', nullable: true })
  nombreEmpresa?: string;

  @Column({ name: 'linkfacebook', nullable: true })
  linkfacebook?: string;

  @Column({ name: 'numerocuenta', nullable: true })
  numeroCuenta?: string;

  @Column({ name: 'tipobanco', nullable: true })
  tipoBanco?: string;

  @Column({ name: 'numerodesorteo', nullable: true })
  numeroDeSorteo?: string;

  @Column({ name: 'mensajewhatsappinfo', nullable: true })
  mensajeWhatsappInfo?: string;

  @Column({ name: 'mensajewhatsappapartado', nullable: true })
  mensajeWhatsappApartado?: string;

  @Column({ name: 'mensajewhatsappconfirmado', nullable: true })
  mensajeWhatsappConfirmado?: string;

  @Column({ name: 'mensajewhatsappanuncio', nullable: true })
  mensajeWhatsappAnuncio?: string;

  // Relaciones

  @OneToMany(() => Boleto, boleto => boleto.sorteo)
  boletos: Boleto[];

  @ManyToOne(() => CuentaBancaria, cuenta => cuenta.sorteos, { nullable: true })
  @JoinColumn({ name: 'cuentabancariaid' })
  cuentaBancaria?: CuentaBancaria | null;

  @Column({ name: 'cuentabancariaid', nullable: true })
  cuentaBancariaId?: number;

  @ManyToOne(() => Usuario, usuario => usuario.sorteosAdmin)
  @JoinColumn({ name: 'adminid' })
  admin: Usuario;

  @Column({ name: 'adminid' })
  adminId: number;
}
