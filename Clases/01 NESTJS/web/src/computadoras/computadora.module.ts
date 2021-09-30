import { Module } from '@nestjs/common';
import { ComputadoraService } from './computadora.service';
import { ComputadoraController } from './computadora.controller';
import { PrismaService } from '../prisma.service';

@Module({
  imports: [],
  providers: [ComputadoraService, PrismaService],
  exports: [ComputadoraService],
  controllers: [ComputadoraController],
})
export class ComputadoraModule {}
