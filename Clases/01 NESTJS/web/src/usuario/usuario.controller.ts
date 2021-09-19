import {Body, Controller, Delete, Get, Param, Post, Put, Res} from '@nestjs/common';
import {UsuarioService} from "./usuario.service";
import {Prisma} from "@prisma/client";

// http://localhost:3000/usuario/......
@Controller('usuario')
export class UsuarioController {
    constructor(// inyeccion dependencias
        private usuarioService: UsuarioService,
    ) {}

    @Get(':idUsuario')
    obtenerUno(@Param() parametrosRuta) {
        return this.usuarioService.buscarUno(+parametrosRuta.idUsuario);
    }
    @Put('/:idUsuario/:apellido/:nombre')
    actualizarUno(@Param() params) {
        const objetoWhere: Prisma.EPN_USUARIOWhereUniqueInput = {
            id: Number(params.idUsuario),
        };
        const objetoUsuarioUpdate: Prisma.EPN_USUARIOUpdateInput = {
            apellido: params.apellido,
            nombre: params.nombre,
        };
        const parametrosActualizar = {
            where: objetoWhere,
            data: objetoUsuarioUpdate,
        };
        return this.usuarioService.actualizarUno(parametrosActualizar);
    }

    @Post()
    crearUno(@Body() bodyParams) {
        const objetoUsuario: Prisma.EPN_USUARIOCreateInput = {
            apellido: bodyParams.apellido,
            nombre: bodyParams.nombre,
        };
        return this.usuarioService.crearUno(objetoUsuario);
    }

    @Delete(':idUsuario')
    eliminarUno(@Param() parametro) {
        return this.usuarioService.eliminarUno(+parametro.idUsuario);
    }
}