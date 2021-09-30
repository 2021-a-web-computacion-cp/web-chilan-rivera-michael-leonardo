import { ComputadoraService } from './computadora.service';
import { Prisma } from '@prisma/client';
export declare class ComputadoraController {
    private computadoraService;
    constructor(computadoraService: ComputadoraService);
    actualizarUno(res: any, parametrosRuta: any, parametrosCuerpo: any): Promise<void>;
    obtenenerUno(res: any, parametrosRuta: any): Promise<void>;
    elminarComputadora(response: any, parametrosRuta: any): Promise<void>;
    agregarComputadoraFormulario(res: any, parametrosCuerpo: any): Promise<void>;
    inicio(response: any): void;
    vistaCrear(response: any, parametrosConsulta: any): void;
    listaComputadoras(response: any, parametrosConsulta: any): Promise<void>;
    obtenerUno(parametrosRuta: any): Prisma.Prisma__ComputadorasClient<import(".prisma/client").Computadoras>;
}
