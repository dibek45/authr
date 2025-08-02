import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity'; // asegúrate de que el path sea correcto
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(Usuario)
    private readonly usuarioRepo: Repository<Usuario>,
  ) {}

  async validateUser(email: string, password: string) {
    console.log('📥 Llega a validar usuario:', email);

    const user = await this.usuarioRepo.findOne({ where: { email } });

    if (!user) {
      console.log('❌ Usuario no encontrado:', email);
      return null;
    }

    if (user.password !== password) {
      console.log('❌ Contraseña incorrecta para:', email);
      return null;
    }

    console.log('✅ Usuario autenticado:', user.email);

    return {
      access_token: this.jwtService.sign({
        id: user.id,
        email: user.email,
        rol: user.rol,
        nombre: user.nombre,
      }),
    };
  }

  async findUserByEmail(email: string): Promise<Usuario | null> {
    return this.usuarioRepo.findOne({ where: { email } });
  }
}
