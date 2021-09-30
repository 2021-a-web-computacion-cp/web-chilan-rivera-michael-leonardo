import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ComputadoraService {
  constructor(private prisma: PrismaService) {}

  buscarMuchos(parametrosBusqueda: {
    skip?: number;
    take?: number;
    busqueda?: string;
    //orderBy ?: Prisma.EPN_UsuarioOrderByInput;
  }) {
    const or = parametrosBusqueda.busqueda
      ? {
          OR: [
            { marca: { contains: parametrosBusqueda.busqueda } },
            { tipo: { contains: parametrosBusqueda.busqueda } },
          ],
        }
      : {};
    return this.prisma.computadoras.findMany({
      where: or,
      take: Number(parametrosBusqueda.take) || undefined,
      skip: Number(parametrosBusqueda.skip) || undefined,
    });
  }

  buscarUno(id: number) {
    return this.prisma.computadoras.findUnique({
      where: {
        id: id,
      },
    });
  }
  crearUno(computadora: Prisma.ComputadorasCreateInput) {
    return this.prisma.computadoras.create({
      data: computadora,
    });
  }
  actualizarUno(parametrosActualizar: {
    id: number;
    data: Prisma.ComputadorasUpdateInput;
  }) {
    return this.prisma.computadoras.update({
      data: parametrosActualizar.data,
      where: { id: parametrosActualizar.id },
    });
  }
  eliminarUno(id: number) {
    return this.prisma.computadoras.delete({
      where: { id: id },
    });
  }
}
