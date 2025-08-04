import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Sorteo } from './entities/sorteo.entity';    // Correct import path
import { Usuario } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class AuthService  {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    @InjectRepository(Sorteo)
    private readonly sorteoRepository: Repository<Sorteo>,
  ) {}

  // Validate the user based on email and password
  async validateUser(email: string, password: string) {
    this.logger.log(`📥 Llega a validar usuario: ${email}`);

    // Buscar el usuario por email usando TypeORM
    const user = await this.usuarioRepository.findOne({ where: { email } });

    if (!user) {
      this.logger.warn(`❌ Usuario no encontrado: ${email}`);
      return null;
    }

    this.logger.log(`🧾 Contraseña en la base de datos (hash): ${user.password}`);

    // Comparar la contraseña
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      this.logger.warn(`❌ Contraseña incorrecta para: ${email}`);
      return null;
    }

    this.logger.log(`✅ Usuario autenticado: ${user.email}`);

    // Obtener los sorteos administrados por el usuario
    const sorteos = await this.sorteoRepository.find({ where: { adminId: user.id } });

    const payload = {
      id: user.id,
      email: user.email,
      rol: user.rol,
      nombre: user.nombre,
      sorteos: sorteos.map(s => s.id),
    };

    return {
      access_token: this.jwtService.sign(payload),
      sorteos,
    };
  }

  // Function to get a user by email
  async findUserByEmail(email: string): Promise<Usuario | null> {
    return this.usuarioRepository.findOne({ where: { email } });
  }




  // Rehash the password of a user
  async rehashPassword(email: string, newPassword: string): Promise<void> {
    this.logger.log(`🔄 Rehasheando contraseña para: ${email}`);

    const user = await this.usuarioRepository.findOne({ where: { email } });

    if (!user) {
      throw new Error(`Usuario con email ${email} no encontrado`);
    }

    // Hash the new password
    const newHash = await bcrypt.hash(newPassword, 10);
    await this.usuarioRepository.update({ email }, { password: newHash });

    this.logger.log(`✅ Nueva contraseña hasheada y guardada para ${email}`);
  }



  async crearUsuario(dto: CreateUserDto) {
    const { email, password, nombre, rol } = dto;

    const yaExiste = await this.usuarioRepository.findOne({ where: { email } });
    if (yaExiste) {
      this.logger.warn(`🟡 Ya existe el usuario: ${yaExiste.email}`);
      return { message: '⚠️ Ya existe el usuario' };
    }

    const hash = await bcrypt.hash(password, 10);

    await this.usuarioRepository.save({
      email,
      password: hash,
      nombre,
      rol,
    });

    this.logger.log(`✅ Usuario ${email} creado`);
    return { message: '✅ Usuario creado', email };
  }

}
