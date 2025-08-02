import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Sorteo } from './entities/sorteo.entity';


@Module({
  imports: [
    JwtModule.register({
      secret: 'supersecretkey',
      signOptions: {
        algorithm: 'HS256',  // ✅ Ensure this is correct
        expiresIn: '1h',
      },
    }),
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE_RFS',
        transport: Transport.TCP,
        options: {
      host: 'auth-r', // ✅ Usa el nombre del contenedor al que quieres conectarte
          port: 4003,
        },
      },
      
    ]),
    
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres-rifas', // 👈 CAMBIA esto (antes decía 'db')
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'rifas',
      entities: [Usuario,Sorteo],  // 🔹 Asegúrate de importar tus entidades
      synchronize: true, // ⚠️ Solo para desarrollo, en producción usa migrations
      autoLoadEntities: true,
    }),
    TypeOrmModule.forFeature([Usuario,Sorteo])
  ],
  controllers: [AuthController], // ✅ Asegurar que el controlador está registrado
  providers: [AuthService],
})
export class AuthModule {}
