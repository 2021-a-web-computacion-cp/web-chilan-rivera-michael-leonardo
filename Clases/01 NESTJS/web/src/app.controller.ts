import{
  BadRequestException, Body,
  Controller,
  Get,
  Header,
  Headers,
  HttpCode,
  InternalServerErrorException, Param, Post, Put, Query,
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
    };
  }
  // Deber03-------------------------------------------------------
  @Get('suma/:numeroUno/:numeroDos')
  @HttpCode(200)
  suma(@Param() parametros, @Req() req, @Res({ passthrough: true }) res) {

    const parametrosRuta = parametros;
    const numeroUno = Number(parametrosRuta['numeroUno'].toString());
    const numeroDos = Number(parametrosRuta['numeroDos'].toString());

    const result = operacionesMatematicas(res, req, 'suma', numeroUno, numeroDos);
    const resultadoSuma = result.resultadoOperacion;
    const cookie = result.cookie;

    return {
      parametrosRuta,
      resultadoSuma,
      cookie,
    };
  }

  @Post('resta')
  @HttpCode(201)
  resta(
      @Body() bodyParams,
      @Headers() cabecerasPeticion,
      @Req() req,
      @Res({ passthrough: true }) res,
  ) {
    const parametrosdeCuerpo = bodyParams;
    const numeroUno = Number(parametrosdeCuerpo['numeroUno'].toString());
    const numeroDos = Number(parametrosdeCuerpo['numeroDos'].toString());

    const result = operacionesMatematicas(res, req, 'resta', numeroUno, numeroDos);
    const resultadoResta = result.resultadoOperacion;
    const cookie = result.cookie;

    return {
      parametrosdeCuerpo,
      resultadoResta,
      cookie,
    };
  }

  @Put('multiplicacion')
  @HttpCode(200)
  multiplicacion(@Body() params, @Req() req, @Res({ passthrough: true }) res) {
    const parametros = params;
    const numeroUno = Number(parametros['numeroUno'].toString());
    const numeroDos = Number(parametros['numeroDos'].toString());

    const result = operacionesMatematicas(res, req, 'multiplicacion', numeroUno, numeroDos);
    const resultadoMultiplicacion = result.resultadoOperacion;
    const cookie = result.cookie;

    return {
      parametros,
      resultadoMultiplicacion,
      cookie,
    };
  }

  @Get('division/:numeroUno/:numeroDos')
  @HttpCode(200)
  division(@Param() params, @Req() req, @Res({ passthrough: true }) res) {

    const parametrosRuta = params;
    const numeroUno = Number(parametrosRuta['numeroUno'].toString());
    const numeroDos = Number(parametrosRuta['numeroDos'].toString());

    const result = operacionesMatematicas(res, req, 'division', numeroUno, numeroDos);
    const resultadoDivision = result.resultadoOperacion;
    const cookie = result.cookie;

    return {
      parametrosRuta,
      resultadoDivision,
      cookie,
    };
  }
}

function operacionesMatematicas(res, req, operacion, numeroUno, numeroDos) {

  let resultadoOperacionNumber: number;

  const cookie = req.signedCookies;
  const valorCookie = cookie['cookieNumero'];

  switch (operacion) {
    case 'suma': {
      resultadoOperacionNumber = numeroUno + numeroDos;
      break;
    }
    case 'resta': {
      resultadoOperacionNumber = numeroUno - numeroDos;
      break;
    }
    case 'multiplicacion': {
      resultadoOperacionNumber = numeroUno * numeroDos;
      break;
    }
    case 'division': {
      resultadoOperacionNumber = numeroUno / numeroDos;
      break;
    }
  }

  if (valorCookie == undefined) {
    const nuevoValor = 100 - resultadoOperacionNumber;
    res.cookie(
        'cookieNumero', //Nombre
        String(nuevoValor), // Valor
        {
          signed: true,
        },
    );
    cookie['cookieNumero'] = String(nuevoValor);
    console.log('Se seteo la cookie');
  } else {
    const nuevoValor = Number(valorCookie) - resultadoOperacionNumber;
    if (nuevoValor > 0) {
      cookie['cookieNumero'] = String(nuevoValor);
      res.cookie('cookieNumero', String(nuevoValor), {
        signed: true,
      });
      console.log('Ya existe una cookie, valor actualizado');
      console.log('Nuevo Valor: ' + cookie['cookieNumero']);
    } else {
      res.cookie('cookieNumero', '100', {
        signed: true,
      });
      cookie['cookieNumero'] = '100';
      res.send('Terminaste el juego, cookie seteada en 100');
    }
  }
  const resultadoOperacion = String(resultadoOperacionNumber);
  return {
    cookie,
    resultadoOperacion,
  };
}
