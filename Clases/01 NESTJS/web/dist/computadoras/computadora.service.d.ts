import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';
export declare class ComputadoraService {
    private prisma;
    constructor(prisma: PrismaService);
    buscarMuchos(parametrosBusqueda: {
        skip?: number;
        take?: number;
        busqueda?: string;
    }): import(".prisma/client").PrismaPromise<import(".prisma/client").Computadoras[]>;
    buscarUno(id: number): Prisma.Prisma__ComputadorasClient<import(".prisma/client").Computadoras>;
    crearUno(computadora: Prisma.ComputadorasCreateInput): Prisma.Prisma__ComputadorasClient<import(".prisma/client").Computadoras>;
    actualizarUno(parametrosActualizar: {
        id: number;
        data: Prisma.ComputadorasUpdateInput;
    }): Prisma.Prisma__ComputadorasClient<import(".prisma/client").Computadoras>;
    eliminarUno(id: number): Prisma.Prisma__ComputadorasClient<import(".prisma/client").Computadoras>;
}
