import {
  BadRequestException, Body,
  Controller,
  Get,
  Header,
  Headers,
  HttpCode,
  InternalServerErrorException, Param, Post, Query,
  Req,
  Res
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('texto')// URL
  @HttpCode(200)
  holaTexto(): string {
    return 'HOLA TEXTO';
  }
  @Get('html')
  @HttpCode(201)
  holaHTML(): string {
    return '<h1>Hola HTML<h1> <button>Click</button>'
  }
  @Get('json')
  @HttpCode(200)
  holaJson(): string {
    return '{mensaje: "Hola json"}';
  }

  // Clase 08
  //tipo de errores
  @Get('bad-request')
  badRequest() {
    throw new BadRequestException();
  }

  @Get('internal-error')
  internalError() {
    throw new InternalServerErrorException();
  }

  @Get('setear-cookie-insegura')
  setearCookieInsegura(
      @Req() req, // request - PETICION
      @Res() res, // response - RESPUESTA
  ) {
    res.cookie(
        'galletaInsegura', //nombre
        'Tengo hambre', // valor
    );
    res.cookie(
        'galletaSeguraYFirmada', //nombre
        'Web :3', // valor
        {
          secure: true, // solo se transfiere por canales confiables https
          signed: true,
        }
    );
    res.send('ok'); // return de antes
  }

  @Get('mostrar-cookies')
  mostrarCookies(@Req() req) {
    const mensaje = {
      sinFirmar: req.cookies,
      firmadas: req.signedCookies,
    };
    //para obtener una cookie quemada: req.signedCookies. Si existe esta cookie continuar
    return mensaje;
  }

  @Get('parametros-consulta/:nombre/:apellido')
  @HttpCode(200)
  @Header('Cache-Control', 'none') // cabeceras de respuesta (response)
  @Header('EPN', 'SISTEMAS')
  parametrosConsulta(
      @Query() queryParams,
      @Param() params
  ) {
    return {
      parametrosConsulta: queryParams,
      parametrosRuta: params,
    };
  }


  @Post('parametros-cuerpo') //201, por defecto se coloca este código de estado
  @HttpCode(200) // colocar 200 ya que no se está creando nada
  parametrosCuerpo(
      @Body() bodyParams,
      @Headers() cabecerasPeticion,
  ) {
    return {
      parametrosCuerpo: bodyParams,
      cabeceras: cabecerasPeticion,
    }
  }
}
