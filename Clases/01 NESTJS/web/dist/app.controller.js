"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    getHello() {
        return this.appService.getHello();
    }
    holaTexto() {
        return 'HOLA TEXTO';
    }
    holaHTML() {
        return '<h1>Hola HTML<h1> <button>Click</button>';
    }
    holaJson() {
        return '{mensaje: "Hola json"}';
    }
    badRequest() {
        throw new common_1.BadRequestException();
    }
    internalError() {
        throw new common_1.InternalServerErrorException();
    }
    setearCookieInsegura(req, res) {
        res.cookie('galletaInsegura', 'Tengo hambre');
        res.cookie('galletaSeguraYFirmada', 'Web :3', {
            secure: true,
            signed: true,
        });
        res.send('ok');
    }
    mostrarCookies(req) {
        const mensaje = {
            sinFirmar: req.cookies,
            firmadas: req.signedCookies,
        };
        return mensaje;
    }
    parametrosConsulta(queryParams, params) {
        return {
            parametrosConsulta: queryParams,
            parametrosRuta: params,
        };
    }
    parametrosCuerpo(bodyParams, cabecerasPeticion) {
        return {
            parametrosCuerpo: bodyParams,
            cabeceras: cabecerasPeticion,
        };
    }
    suma(parametros, req, res) {
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
    resta(bodyParams, cabecerasPeticion, req, res) {
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
    multiplicacion(params, req, res) {
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
    division(params, req, res) {
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
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getHello", null);
__decorate([
    (0, common_1.Get)('texto'),
    (0, common_1.HttpCode)(200),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "holaTexto", null);
__decorate([
    (0, common_1.Get)('html'),
    (0, common_1.HttpCode)(201),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "holaHTML", null);
__decorate([
    (0, common_1.Get)('json'),
    (0, common_1.HttpCode)(200),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "holaJson", null);
__decorate([
    (0, common_1.Get)('bad-request'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "badRequest", null);
__decorate([
    (0, common_1.Get)('internal-error'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "internalError", null);
__decorate([
    (0, common_1.Get)('setear-cookie-insegura'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "setearCookieInsegura", null);
__decorate([
    (0, common_1.Get)('mostrar-cookies'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "mostrarCookies", null);
__decorate([
    (0, common_1.Get)('parametros-consulta/:nombre/:apellido'),
    (0, common_1.HttpCode)(200),
    (0, common_1.Header)('Cache-Control', 'none'),
    (0, common_1.Header)('EPN', 'SISTEMAS'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "parametrosConsulta", null);
__decorate([
    (0, common_1.Post)('parametros-cuerpo'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "parametrosCuerpo", null);
__decorate([
    (0, common_1.Get)('suma/:numeroUno/:numeroDos'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "suma", null);
__decorate([
    (0, common_1.Post)('resta'),
    (0, common_1.HttpCode)(201),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)()),
    __param(2, (0, common_1.Req)()),
    __param(3, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "resta", null);
__decorate([
    (0, common_1.Put)('multiplicacion'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "multiplicacion", null);
__decorate([
    (0, common_1.Get)('division/:numeroUno/:numeroDos'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "division", null);
AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
exports.AppController = AppController;
function operacionesMatematicas(res, req, operacion, numeroUno, numeroDos) {
    let resultadoOperacionNumber;
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
        res.cookie('cookieNumero', String(nuevoValor), {
            signed: true,
        });
        cookie['cookieNumero'] = String(nuevoValor);
        console.log('Se seteo la cookie');
    }
    else {
        const nuevoValor = Number(valorCookie) - resultadoOperacionNumber;
        if (nuevoValor > 0) {
            cookie['cookieNumero'] = String(nuevoValor);
            res.cookie('cookieNumero', String(nuevoValor), {
                signed: true,
            });
            console.log('Ya existe una cookie, valor actualizado');
            console.log('Nuevo Valor: ' + cookie['cookieNumero']);
        }
        else {
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
//# sourceMappingURL=app.controller.js.map