import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';  // Importar TypeOrmModule
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Usuario } from './entities/user.entity';
import { CuentaBancaria } from './entities/cuenta-bancaria.entity';
import { Sorteo } from './entities/sorteo.entity';
import { Boleto } from './entities/boleto.entity';
import { Comprador } from './entities/comprador.entity';
import { Vendedor } from './entities/vendedor.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario, Sorteo]),  // Registrar los repositorios en TypeORM
    JwtModule.register({
      secret: 'supersecretkey',
      signOptions: {
        algorithm: 'HS256',  
        expiresIn: '1h',
      },
    }),
     TypeOrmModule.forRoot({
      type: 'postgres',  // Asegúrate de usar PostgreSQL
      url: process.env.DATABASE_URL,  // Usamos la URL de conexión desde las variables de entorno
  entities: [Usuario, Sorteo, Boleto, CuentaBancaria, Comprador,Vendedor], // ✅ Agrega Comprador
      synchronize: true,  // Ten cuidado con esta opción en producción
    }),
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE_RFS',
        transport: Transport.TCP,
        options: {
          host: 'auth-r',  
          port: 4003,
        },
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
  ],
})
export class AuthModule {}

