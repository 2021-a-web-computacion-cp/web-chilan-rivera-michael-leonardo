import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {PrismaService} from "./prisma.service";

// Decorador -> Funciones
@Module({
  imports: [// Modulos importados

  ],
  controllers: [// controladores de este modulo
      AppController
  ],
  providers: [// servicios de este modulo
      AppService,
      PrismaService,
  ],
  exports: [// servicios exportados (que se pueden usar fuera de este modulo)
      AppService],
})
export class AppModule {}
