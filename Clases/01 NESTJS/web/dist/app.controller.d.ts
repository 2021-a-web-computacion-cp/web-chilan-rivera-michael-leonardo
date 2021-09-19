import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): string;
    holaTexto(): string;
    holaHTML(): string;
    holaJson(): string;
    badRequest(): void;
    internalError(): void;
    setearCookieInsegura(req: any, res: any): void;
    mostrarCookies(req: any): {
        sinFirmar: any;
        firmadas: any;
    };
    parametrosConsulta(queryParams: any, params: any): {
        parametrosConsulta: any;
        parametrosRuta: any;
    };
    parametrosCuerpo(bodyParams: any, cabecerasPeticion: any): {
        parametrosCuerpo: any;
        cabeceras: any;
    };
    suma(parametros: any, req: any, res: any): {
        parametrosRuta: any;
        resultadoSuma: string;
        cookie: any;
    };
    resta(bodyParams: any, cabecerasPeticion: any, req: any, res: any): {
        parametrosdeCuerpo: any;
        resultadoResta: string;
        cookie: any;
    };
    multiplicacion(params: any, req: any, res: any): {
        parametros: any;
        resultadoMultiplicacion: string;
        cookie: any;
    };
    division(params: any, req: any, res: any): {
        parametrosRuta: any;
        resultadoDivision: string;
        cookie: any;
    };
}
