import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    InternalServerErrorException,
    Param,
    Post,
    Put,
    Res
} from '@nestjs/common';
import {UsuarioService} from "./usuario.service";
import {Prisma} from "@prisma/client";
import {UsuarioCrearDto} from "./dto/usuario-crear.dto";
import {validate} from "class-validator";

// http://localhost:3000/usuario/......
@Controller('usuario')
export class UsuarioController {
    constructor(// inyeccion dependencias
        private usuarioService: UsuarioService,
    ) {}

    @Get('lista-usuarios')
    listaUsuarios(@Res() response) {
        response.render('inicio.ejs');
    }

    @Get(':idUsuario')
    obtenerUno(@Param() parametrosRuta) {
        this.usuarioService.crearUno({
            apellido: '...',
            fechaCreacion: new Date(),
            nombre: '...',
        });
        this.usuarioService.actualizarUno({
            id: 1,
            data: {
                nombre: '...',
                // fechaCreacion: '...',
                // fechaCreacion: new Date(),
            },
        });
        this.usuarioService.eliminarUno(1);
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
        return this.usuarioService.actualizarUno(params);
    }

    @Post()
    async crearUno(@Body() bodyParams) {
        const usuarioCrearDto = new UsuarioCrearDto();
        usuarioCrearDto.nombre = bodyParams.nombre;
        usuarioCrearDto.apellido = bodyParams.apellido;
        usuarioCrearDto.fechaCreacion = bodyParams.fechaCreacion;
        try {
            const errores = await validate(usuarioCrearDto);
            if (errores.length > 0) {
                throw new BadRequestException('No envía bien los parámetros');
            } else {
                return this.usuarioService.crearUno(usuarioCrearDto);
            }
        } catch (error) {
            console.error({error: error, mensaje: 'Errores en crear usuario' });
            throw new InternalServerErrorException('Error servidor');
        }
    }

    @Delete(':idUsuario')
    eliminarUno(@Param() parametro) {
        return this.usuarioService.eliminarUno(+parametro.idUsuario);
    }


}