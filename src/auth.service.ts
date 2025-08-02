import { Injectable, OnModuleInit } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from './prisma/prisma.service';  // Inyectamos PrismaService
import * as bcrypt from 'bcrypt';
import { Usuario, Sorteo } from '@prisma/client';

@Injectable()
export class AuthService implements OnModuleInit {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,  // Prisma inyectado aquí
  ) {}

  async validateUser(email: string, password: string) {
    console.log('📥 Llega a validar usuario:', email);
    console.log('🔑 Contraseña enviada desde el frontend:', password);

    // Buscar el usuario por email usando Prisma
    const user: Usuario | null = await this.prisma.usuario.findUnique({
      where: { email },
    });

    if (!user) {
      console.log('❌ Usuario no encontrado:', email);
      return null;
    }

    console.log('🧾 Contraseña en la base de datos (hash):', user.password);

    // Comparar la contraseña
    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log('🔍 ¿Coincide la contraseña?', passwordMatch);

    if (!passwordMatch) {
      console.log('❌ Contraseña incorrecta para:', email);
      return null;
    }

    console.log('✅ Usuario autenticado:', user.email);

    // Obtener los sorteos administrados por el usuario
    const sorteos: Sorteo[] = await this.prisma.sorteo.findMany({
      where: { adminId: user.id },
      select: { id: true },
    });

    const payload = {
      id: user.id,
      email: user.email,
      rol: user.rol,
      nombre: user.nombre,
      sorteos: sorteos.map(s => s.id),
    };

    return {
      access_token: this.jwtService.sign(payload),
      sorteos,  // También puedes devolverlos aquí si no los metes en el token
    };
  }

  // Función para obtener usuario por email
  async findUserByEmail(email: string): Promise<Usuario | null> {
    return this.prisma.usuario.findUnique({ where: { email } });
  }

  // Función para inicializar el módulo y crear el usuario "David"
  async onModuleInit() {
    await this.crearUsuarioDavid();
  }

  // Crear usuario si no existe
  async crearUsuarioDavid() {
    const email = 'david@gmail.com';
    const password = '12345678';

    // Verificar si el usuario ya existe
    const yaExiste = await this.prisma.usuario.findUnique({ where: { email } });
    if (yaExiste) {
      console.log('🟡 Ya existe el usuario:', yaExiste.email);
      return;
    }

    // Crear el usuario con contraseña hasheada
    const hash = await bcrypt.hash(password, 10);
    await this.prisma.usuario.create({
      data: {
        email,
        password: hash,
        nombre: 'David',
        rol: 'admin',
      },
    });

    console.log('✅ Usuario david@gmail.com creado');
  }

  // Rehashear la contraseña de un usuario
  async rehashPassword(email: string, newPassword: string): Promise<void> {
    console.log('🔄 Rehasheando contraseña para:', email);

    const user = await this.prisma.usuario.findUnique({ where: { email } });

    if (!user) {
      throw new Error(`Usuario con email ${email} no encontrado`);
    }

    // Hashear la nueva contraseña
    const newHash = await bcrypt.hash(newPassword, 10);
    await this.prisma.usuario.update({
      where: { email },
      data: { password: newHash },
    });

    console.log(`✅ Nueva contraseña hasheada y guardada para ${email}`);
  }
}
