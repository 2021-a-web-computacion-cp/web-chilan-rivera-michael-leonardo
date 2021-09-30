import {
  BadRequestException,
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { ComputadoraService } from './computadora.service';
import { Prisma } from '@prisma/client';
import { validate } from 'class-validator';
import { ComputadoraCrearDto } from './dto/computadora-crear.dto';
import { ComputadoraActualizarDto } from './dto/computadora-actualizar.dto';

@Controller('computadora')
export class ComputadoraController {
  constructor(private computadoraService: ComputadoraService) {}

  @Post('actualizar-computadora-formulario/:idComputadora')
  async actualizarUno(
    @Res() res,
    @Param() parametrosRuta,
    @Body() parametrosCuerpo,
  ) {
    const computadoraActualizarDto = new ComputadoraActualizarDto();
    computadoraActualizarDto.precio = +parametrosCuerpo.precio;
    computadoraActualizarDto.disponible =
      parametrosCuerpo.disponible == 'true' ? true : false;
    computadoraActualizarDto.cantidad = +parametrosCuerpo.cantidad;
    const computadora: Prisma.ComputadorasUpdateInput = {
      precio: computadoraActualizarDto.precio,
      disponible: computadoraActualizarDto.disponible,
      cantidad: computadoraActualizarDto.cantidad,
    };
    const parametrosActualizar = {
      id: Number(parametrosRuta.idComputadora),
      data: computadora,
    };
    const errores = await validate(computadoraActualizarDto);
    if (errores.length > 0) {
      res.redirect(
        '/computadora/lista-computadoras' + '?alerta=Ingrese bien los datos',
      );
      console.log(JSON.stringify(errores));
      throw new BadRequestException('No envía bien los parámetros');
    } else {
      try {
        await this.computadoraService.actualizarUno(parametrosActualizar);
        res.redirect('/computadora/lista-computadoras');
      } catch (error) {
        console.log({
          error: error,
          mensaje: 'Error en actualizar computadora',
        });
        throw new InternalServerErrorException('Error en el servidor');
      }
    }
  }

  @Post('actualizar-computadora/:idComputadora')
  async obtenenerUno(@Res() res, @Param() parametrosRuta) {
    try {
      const respuesta = await this.computadoraService.buscarUno(
        +parametrosRuta.idComputadora,
      );
      console.log(respuesta);
      res.render('computadora/actualizar.ejs', {
        datos: { computadora: respuesta },
      });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('error');
    }
  }

  @Post('eliminar-computadora/:idComputadora')
  async elminarComputadora(@Res() response, @Param() parametrosRuta) {
    try {
      await this.computadoraService.eliminarUno(+parametrosRuta.idComputadora);
      response.redirect(
        '/computadora/lista-computadoras' +
          '?mensaje=Se eliminó una computadora de la marca ' +
          parametrosRuta.marca,
      );
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error');
    }
  }

  @Post('agregar-computadora-formulario')
  async agregarComputadoraFormulario(@Res() res, @Body() parametrosCuerpo) {
    const computadoraCrearDto = new ComputadoraCrearDto();
    computadoraCrearDto.marca = parametrosCuerpo.marca;
    computadoraCrearDto.tipo = parametrosCuerpo.tipo;
    computadoraCrearDto.precio = +parametrosCuerpo.precio;
    computadoraCrearDto.fechaSubida = parametrosCuerpo.fechaSubida;
    computadoraCrearDto.disponible =
      parametrosCuerpo.disponible == 'true' ? true : false;
    computadoraCrearDto.cantidad = +parametrosCuerpo.cantidad;
    try {
      const errores = await validate(computadoraCrearDto);
      if (errores.length > 0) {
        //res.redirect('/computadora/vista-crear'+ '?alerta=Ingrese bien los datos');
        //console.log(JSON.stringify(errores));
        throw new BadRequestException('No envía bien los parámetros');
      } else {
        const respuestaComputadora = await this.computadoraService.crearUno({
          marca: computadoraCrearDto.marca,
          tipo: computadoraCrearDto.tipo,
          precio: computadoraCrearDto.precio,
          disponible: computadoraCrearDto.disponible,
          cantidad: computadoraCrearDto.cantidad,
        });
        res.redirect(
          '/computadora/vista-crear' +
            '?mensaje=Se agregó la computadora de la marca ' +
            parametrosCuerpo.marca,
        );
      }
    } catch (error) {
      console.error({
        error: error,
        mensaje: 'Errores en agregar la computadora',
      });
      throw new InternalServerErrorException('Error servidor');
    }
  }

  @Get('inicio')
  inicio(@Res() response) {
    response.render('inicio.ejs');
  }

  @Get('vista-crear')
  vistaCrear(@Res() response, @Query() parametrosConsulta) {
    response.render('computadora/crear.ejs', {
      datos: {
        mensaje: parametrosConsulta.mensaje,
      },
    });
  }

  @Get('lista-computadoras')
  async listaComputadoras(@Res() response, @Query() parametrosConsulta) {
    try {
      const respuesta = await this.computadoraService.buscarMuchos({
        skip: parametrosConsulta.skip ? +parametrosConsulta.skip : undefined,
        take: parametrosConsulta.take ? +parametrosConsulta.take : undefined,
        busqueda: parametrosConsulta.busqueda
          ? parametrosConsulta.busqueda
          : undefined,
      });
      console.log(respuesta);
      response.render('computadora/lista.ejs', {
        datos: {
          computadoras: respuesta,
          mensaje: parametrosConsulta.mensaje,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Error del servidor');
    }
  }

  @Get(':idComputadora')
  obtenerUno(@Param() parametrosRuta) {
    this.computadoraService.crearUno({
      marca: '',
      tipo: '',
      precio: 0,
      fechaSubida: new Date(),
      disponible: false,
      cantidad: 0,
    });
    this.computadoraService.actualizarUno({
      id: 1,
      data: {
        precio: 0,
        disponible: false,
        cantidad: 0,
      },
    });
    this.computadoraService.eliminarUno(1);
    return this.computadoraService.buscarUno(+parametrosRuta.idComputadora);
  }
}
