import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';  // Importar TypeOrmModule
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Usuario } from './entities/user.entity';
import { Sorteo } from './entities/sorteo.entity';
import { CuentaBancaria } from './entities/cuenta-bancaria.entity';
import { Boleto } from './entities/boleto.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario, Sorteo]),  // Registrar los repositorios en TypeORM
    JwtModule.register({
      secret: 'supersecretkey',
      signOptions: {
        algorithm: 'HS256',  // Asegúrate de que es correcto
        expiresIn: '1h',
      },
    }),
     TypeOrmModule.forRoot({
      type: 'postgres',  // Asegúrate de usar PostgreSQL
      url: process.env.DATABASE_URL,  // Usamos la URL de conexión desde las variables de entorno
      entities: [Usuario, Sorteo, Boleto, CuentaBancaria],  // Agregamos todas las entidades
      synchronize: true,  // Ten cuidado con esta opción en producción
    }),
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE_RFS',
        transport: Transport.TCP,
        options: {
          host: 'auth-r',  // Usa el nombre del contenedor al que te quieres conectar
          port: 4003,
        },
      },
    ]),
  ],
  controllers: [AuthController], // Asegúrate de que el controlador esté registrado
  providers: [
    AuthService,
  ],
})
export class AuthModule {}

