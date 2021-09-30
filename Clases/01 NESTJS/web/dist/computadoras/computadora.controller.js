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
exports.ComputadoraController = void 0;
const common_1 = require("@nestjs/common");
const computadora_service_1 = require("./computadora.service");
const class_validator_1 = require("class-validator");
const computadora_crear_dto_1 = require("./dto/computadora-crear.dto");
const computadora_actualizar_dto_1 = require("./dto/computadora-actualizar.dto");
let ComputadoraController = class ComputadoraController {
    constructor(computadoraService) {
        this.computadoraService = computadoraService;
    }
    async actualizarUno(res, parametrosRuta, parametrosCuerpo) {
        const computadoraActualizarDto = new computadora_actualizar_dto_1.ComputadoraActualizarDto();
        computadoraActualizarDto.precio = +parametrosCuerpo.precio;
        computadoraActualizarDto.disponible =
            parametrosCuerpo.disponible == 'true' ? true : false;
        computadoraActualizarDto.cantidad = +parametrosCuerpo.cantidad;
        const computadora = {
            precio: computadoraActualizarDto.precio,
            disponible: computadoraActualizarDto.disponible,
            cantidad: computadoraActualizarDto.cantidad,
        };
        const parametrosActualizar = {
            id: Number(parametrosRuta.idComputadora),
            data: computadora,
        };
        const errores = await (0, class_validator_1.validate)(computadoraActualizarDto);
        if (errores.length > 0) {
            res.redirect('/computadora/lista-computadoras' + '?alerta=Ingrese bien los datos');
            console.log(JSON.stringify(errores));
            throw new common_1.BadRequestException('No envía bien los parámetros');
        }
        else {
            try {
                await this.computadoraService.actualizarUno(parametrosActualizar);
                res.redirect('/computadora/lista-computadoras');
            }
            catch (error) {
                console.log({
                    error: error,
                    mensaje: 'Error en actualizar computadora',
                });
                throw new common_1.InternalServerErrorException('Error en el servidor');
            }
        }
    }
    async obtenenerUno(res, parametrosRuta) {
        try {
            const respuesta = await this.computadoraService.buscarUno(+parametrosRuta.idComputadora);
            console.log(respuesta);
            res.render('computadora/actualizar.ejs', {
                datos: { computadora: respuesta },
            });
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException('error');
        }
    }
    async elminarComputadora(response, parametrosRuta) {
        try {
            await this.computadoraService.eliminarUno(+parametrosRuta.idComputadora);
            response.redirect('/computadora/lista-computadoras' +
                '?mensaje=Se eliminó una computadora de la marca ' +
                parametrosRuta.marca);
        }
        catch (error) {
            console.error(error);
            throw new common_1.InternalServerErrorException('Error');
        }
    }
    async agregarComputadoraFormulario(res, parametrosCuerpo) {
        const computadoraCrearDto = new computadora_crear_dto_1.ComputadoraCrearDto();
        computadoraCrearDto.marca = parametrosCuerpo.marca;
        computadoraCrearDto.tipo = parametrosCuerpo.tipo;
        computadoraCrearDto.precio = +parametrosCuerpo.precio;
        computadoraCrearDto.fechaSubida = parametrosCuerpo.fechaSubida;
        computadoraCrearDto.disponible =
            parametrosCuerpo.disponible == 'true' ? true : false;
        computadoraCrearDto.cantidad = +parametrosCuerpo.cantidad;
        try {
            const errores = await (0, class_validator_1.validate)(computadoraCrearDto);
            if (errores.length > 0) {
                throw new common_1.BadRequestException('No envía bien los parámetros');
            }
            else {
                const respuestaComputadora = await this.computadoraService.crearUno({
                    marca: computadoraCrearDto.marca,
                    tipo: computadoraCrearDto.tipo,
                    precio: computadoraCrearDto.precio,
                    disponible: computadoraCrearDto.disponible,
                    cantidad: computadoraCrearDto.cantidad,
                });
                res.redirect('/computadora/vista-crear' +
                    '?mensaje=Se agregó la computadora de la marca ' +
                    parametrosCuerpo.marca);
            }
        }
        catch (error) {
            console.error({
                error: error,
                mensaje: 'Errores en agregar la computadora',
            });
            throw new common_1.InternalServerErrorException('Error servidor');
        }
    }
    inicio(response) {
        response.render('inicio.ejs');
    }
    vistaCrear(response, parametrosConsulta) {
        response.render('computadora/crear.ejs', {
            datos: {
                mensaje: parametrosConsulta.mensaje,
            },
        });
    }
    async listaComputadoras(response, parametrosConsulta) {
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
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error del servidor');
        }
    }
    obtenerUno(parametrosRuta) {
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
};
__decorate([
    (0, common_1.Post)('actualizar-computadora-formulario/:idComputadora'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ComputadoraController.prototype, "actualizarUno", null);
__decorate([
    (0, common_1.Post)('actualizar-computadora/:idComputadora'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ComputadoraController.prototype, "obtenenerUno", null);
__decorate([
    (0, common_1.Post)('eliminar-computadora/:idComputadora'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ComputadoraController.prototype, "elminarComputadora", null);
__decorate([
    (0, common_1.Post)('agregar-computadora-formulario'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ComputadoraController.prototype, "agregarComputadoraFormulario", null);
__decorate([
    (0, common_1.Get)('inicio'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ComputadoraController.prototype, "inicio", null);
__decorate([
    (0, common_1.Get)('vista-crear'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ComputadoraController.prototype, "vistaCrear", null);
__decorate([
    (0, common_1.Get)('lista-computadoras'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ComputadoraController.prototype, "listaComputadoras", null);
__decorate([
    (0, common_1.Get)(':idComputadora'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ComputadoraController.prototype, "obtenerUno", null);
ComputadoraController = __decorate([
    (0, common_1.Controller)('computadora'),
    __metadata("design:paramtypes", [computadora_service_1.ComputadoraService])
], ComputadoraController);
exports.ComputadoraController = ComputadoraController;
//# sourceMappingURL=computadora.controller.js.map