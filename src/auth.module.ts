import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PrismaService } from './prisma/prisma.service';
// Importar Prisma en lugar de TypeORM

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
    // No se necesita TypeOrmModule, eliminarlo
  ],
  controllers: [AuthController], // ✅ Asegurar que el controlador está registrado
  providers: [
    AuthService,
    PrismaService, // PrismaService como proveedor para interactuar con la base de datos
  ],
})
export class AuthModule {}
