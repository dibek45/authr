import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AuthModule } from './auth.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AuthModule, {
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0', // 🔥 IMPORTANTE: No usar localhost
      port: 4003,
    },
  });

  await app.listen();
  console.log(`✅ Auth Service corriendo en TCP en el puerto 4003`); // 🔥 Asegurar que este mensaje aparece
}
bootstrap();
