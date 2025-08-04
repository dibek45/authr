import * as dotenv from 'dotenv';
dotenv.config(); // ✅ Primero

import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AuthModule } from './auth.module';

async function bootstrap() {
  console.log('📦 DB URL usada:', process.env.DATABASE_URL); // ✅ Ahora sí se verá

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AuthModule, {
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: 4003,
    },
  });

  await app.listen();
  console.log(`✅ Auth Service corriendo en TCP en el puerto 4003`);
}
bootstrap();
