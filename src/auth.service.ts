import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
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
  console.log('🔑 Contraseña enviada desde el frontend:', password);

  const user = await this.usuarioRepo.findOne({ where: { email } });

  if (!user) {
    console.log('❌ Usuario no encontrado:', email);
    return null;
  }

  console.log('🧾 Contraseña en la base de datos (hash):', user.password);

  // 🔥 Fuerza rehash si es "david@gmail.com"
  if (email === 'david@gmail.com') {
    const newHash = await bcrypt.hash('12345678', 10);
    user.password = newHash;
    await this.usuarioRepo.save(user);
    console.log('🛠️ Contraseña rehasheada para david@gmail.com:', newHash);
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  console.log('🔍 ¿Coincide la contraseña?', passwordMatch);

  if (!passwordMatch) {
    console.log('❌ Contraseña incorrecta para:', email);
    return null;
  }

  console.log('✅ Usuario autenticado:', user.email);

  const payload = {
    id: user.id,
    email: user.email,
    rol: user.rol,
    nombre: user.nombre,
  };

  return {
    access_token: this.jwtService.sign(payload),
  };
}



  async findUserByEmail(email: string): Promise<Usuario | null> {
    return this.usuarioRepo.findOne({ where: { email } });
  }
}
