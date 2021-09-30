import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    InternalServerErrorException,
    Param,
    Post,
    Put, Query,
    Res
} from '@nestjs/common';
import {UsuarioService} from "./usuario.service";
import {Prisma} from "@prisma/client";
import {validate} from "class-validator";
import {UsuarioCrearDto} from "./dto/usuario-crear.dto";

// http://localhost:3000/usuario/......
@Controller('usuario')
export class UsuarioController {
    constructor(// inyeccion dependencias
        private usuarioService: UsuarioService,
    ) {}

    @Post('eliminar-usuario/:idUsuario')
    async eliminarUsuario(@Res() response, @Param() parametrosRuta) {
        try {
            await this.usuarioService.eliminarUno(+parametrosRuta.idUsuario);
            response.redirect('/usuario/lista-usuarios' + '?mensaje=Se eliminó al usuario',);
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException('Error');
        }
    }

    @Post('crear-usuario-formulario')
    async crearUsuarioFormulario(@Res() response, @Body() parametrosCuerpo) {
        try {
            const respuestaUsuario = await this.usuarioService.crearUno({
                nombre: parametrosCuerpo.nombre,
                apellido: parametrosCuerpo.apellido,
            });
            response.redirect('/usuario/vista-crear' +
                '?mensaje=Se creó el usuario ' + parametrosCuerpo.nombre,);
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException('Error creando usuario')
        }
    }

    @Get('inicio')
    inicio(@Res() response) {
        response.render('inicio.ejs');
    }

    @Get('vista-crear')
    vistaCrear(@Res() response, @Query() parametrosConsulta) {
        response.render('usuario/crear.ejs', {
            datos: {
                mensaje: parametrosConsulta.mensaje,
            },
        });
    }

    @Get('lista-usuarios')
    async listaUsuarios(@Res() response, @Query() parametrosConsulta) {
        try {
            // validar parametros de consulta con un dto
            const respuesta = await this.usuarioService.buscarMuchos({
                skip: parametrosConsulta.skip ? +parametrosConsulta.skip: undefined,
                take: parametrosConsulta.take ? +parametrosConsulta.take: undefined,
                busqueda: parametrosConsulta.busqueda ? parametrosConsulta.busqueda: undefined,
            });
            console.log(respuesta);
            response.render('usuario/lista.ejs', {
                datos: {
                    usuarios: respuesta,
                    mensaje: parametrosConsulta.mensaje,
                },
            });
        } catch (error) {
            throw new InternalServerErrorException('Error del servidor');
        }
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