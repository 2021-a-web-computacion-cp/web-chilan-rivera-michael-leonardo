import {BadRequestException, Controller, Get, HttpCode, InternalServerErrorException} from '@nestjs/common';
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

}
