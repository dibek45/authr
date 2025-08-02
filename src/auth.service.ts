import { Injectable, OnModuleInit } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import * as bcrypt from 'bcrypt';
import { Sorteo } from './entities/sorteo.entity';

@Injectable()
export class AuthService implements OnModuleInit  {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(Usuario)
    private readonly usuarioRepo: Repository<Usuario>,
    @InjectRepository(Sorteo)
private readonly sorteoRepo: Repository<Sorteo>,
  ) {}

async validateUser(email: string, password: string) {

  console.log('📥 Llega a validar usuario:', email);
  console.log('🔑 Contraseña enviada desde el frontend:', password);

  const user = await this.usuarioRepo.findOne({ where: { email } });

  if (!user) {
    console.log('❌ Usuario no encontrado:', email);
    return null;
  }

  const sorteosRaw = await this.sorteoRepo.query('SELECT id FROM sorteo WHERE "adminId" = $1', [user.id]);
console.log('🔎 raw sorteos:', sorteosRaw);
  console.log('🧾 Contraseña en la base de datos (hash):', user.password);

  const passwordMatch = await bcrypt.compare(password, user.password);
  console.log('🔍 ¿Coincide la contraseña?', passwordMatch);

  if (!passwordMatch) {
    console.log('❌ Contraseña incorrecta para:', email);
    return null;
  }

  console.log('✅ Usuario autenticado:', user.email);


console.log('🧠 user.id:', user.id, typeof user.id);

  // 👇 obtener los sorteos por usuario
const sorteos = await this.sorteoRepo.find({
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
    sorteos, // 👈 También puedes devolverlos aquí si no los metes en el token
  };
}


  async findUserByEmail(email: string): Promise<Usuario | null> {
    return this.usuarioRepo.findOne({ where: { email } });
  }


   async onModuleInit() {
    await this.crearUsuarioDavid();
  }
async crearUsuarioDavid() {
  const email = 'david@gmail.com';
  const password = '12345678';

  const yaExiste = await this.usuarioRepo.findOne({ where: { email } });
  if (yaExiste) {
    console.log('🟡 Ya existe el usuario:', yaExiste.email);
    return;
  }

  const hash = await bcrypt.hash(password, 10);
  const nuevo = this.usuarioRepo.create({
    email,
    password: hash,
    nombre: 'David',
    rol: 'admin',
  });

  await this.usuarioRepo.save(nuevo);
  console.log('✅ Usuario david@gmail.com creado');
}


  async rehashPassword(email: string, newPassword: string): Promise<void> {
  console.log('🔄 Rehasheando contraseña para:', email);

  const user = await this.usuarioRepo.findOne({ where: { email } });

  if (!user) {
    throw new Error(`Usuario con email ${email} no encontrado`);
  }

  const newHash = await bcrypt.hash(newPassword, 10);
  user.password = newHash;
  await this.usuarioRepo.save(user);

  console.log(`✅ Nueva contraseña hasheada y guardada para ${email}`);
}

}
