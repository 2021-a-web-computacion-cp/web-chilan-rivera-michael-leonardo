import { UsuarioService } from "./usuario.service";
import { Prisma } from "@prisma/client";
export declare class UsuarioController {
    private usuarioService;
    constructor(usuarioService: UsuarioService);
    eliminarUsuario(response: any, parametrosRuta: any): Promise<void>;
    crearUsuarioFormulario(response: any, parametrosCuerpo: any): Promise<void>;
    inicio(response: any): void;
    vistaCrear(response: any, parametrosConsulta: any): void;
    listaUsuarios(response: any, parametrosConsulta: any): Promise<void>;
    obtenerUno(parametrosRuta: any): Prisma.Prisma__EPN_USUARIOClient<import(".prisma/client").EPN_USUARIO>;
    actualizarUno(params: any): Prisma.Prisma__EPN_USUARIOClient<import(".prisma/client").EPN_USUARIO>;
    crearUno(bodyParams: any): Promise<import(".prisma/client").EPN_USUARIO>;
    eliminarUno(parametro: any): Prisma.Prisma__EPN_USUARIOClient<import(".prisma/client").EPN_USUARIO>;
}
