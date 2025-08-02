import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService] // 👈 ¡Esto permite usarlo en otros módulos!
})
export class PrismaModule {}
