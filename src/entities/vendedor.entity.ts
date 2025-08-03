  import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Boleto } from './boleto.entity';

@Entity('Vendedor') // 👈 ¡ojo, con mayúscula!
  export class Vendedor {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column({ unique: true })
    email: string;

    @Column({ default: 'vendedor' })
    rol: string;

    
@Column({ name: 'createdat', default: () => 'CURRENT_TIMESTAMP' })
createdAt: Date;

  }
