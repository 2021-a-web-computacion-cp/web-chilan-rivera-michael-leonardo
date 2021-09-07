import {BadRequestException, Controller, Get, HttpCode, InternalServerErrorException} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('texto')
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

  @Get('bad-request')
  badRequest() {
    throw new BadRequestException();
  }

  @Get('internal-error')
  internalError() {
    throw new InternalServerErrorException();
  }

// npm i cookie-parser express-session session-file-store

  @Get('setear-cookie-insegura')
  setearCookieInsegura(
      @Req() req, // request - PETICION
      @Res() res, // response - RESPUESTA
  ) {
    res.cookie(
        'galletaInsegura', // nombre
        'tengo hambre', //valor
    );
    res.cookie(
        'galletaSegura', // nombre
        'Web :3', //valor
        {
          secure: true,
        },
    );

    res.send('ok'); //return de antes
  }

  @Get('mostrar-cookies')
  mostraCookies(@Req() req9) {
    const mensaje = {
      sinFrimar: req.cookies,
      firmadas: req.signedCookies,
    };
    return mensaje
  }

}
