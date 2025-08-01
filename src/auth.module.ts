import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OpsTeam } from './entities/ops-team.entity';


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
          host: '0.0.0.0', // 🔥 Debe coincidir con `main.ts`
          port: 4003,
        },
      },
      
    ]),
    
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',  // 🔹 Nombre del servicio en Docker Compose
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'rifas',
      entities: [OpsTeam],  // 🔹 Asegúrate de importar tus entidades
      synchronize: true, // ⚠️ Solo para desarrollo, en producción usa migrations
      autoLoadEntities: true,
    }),
    TypeOrmModule.forFeature([OpsTeam])
  ],
  controllers: [AuthController], // ✅ Asegurar que el controlador está registrado
  providers: [AuthService],
})
export class AuthModule {}
