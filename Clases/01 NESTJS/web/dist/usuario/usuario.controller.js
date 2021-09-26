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
exports.UsuarioController = void 0;
const common_1 = require("@nestjs/common");
const usuario_service_1 = require("./usuario.service");
const usuario_crear_dto_1 = require("./dto/usuario-crear.dto");
const class_validator_1 = require("class-validator");
let UsuarioController = class UsuarioController {
    constructor(usuarioService) {
        this.usuarioService = usuarioService;
    }
    async eliminarUsuario(response, parametrosRuta) {
        try {
            await this.usuarioService.eliminarUno(+parametrosRuta.idUsuario);
            response.redirect('/usuario/lista-usuarios' + '?mensaje=Se eliminó al usuario');
        }
        catch (error) {
            console.error(error);
            throw new common_1.InternalServerErrorException('Error');
        }
    }
    async crearUsuarioFormulario(response, parametrosCuerpo) {
        try {
            const respuestaUsuario = await this.usuarioService.crearUno({
                nombre: parametrosCuerpo.nombre,
                apellido: parametrosCuerpo.apellido,
            });
            response.redirect('/usuario/vista-crear' +
                '?mensaje=Se creó el usuario ' + parametrosCuerpo.nombre);
        }
        catch (error) {
            console.error(error);
            throw new common_1.InternalServerErrorException('Error creando usuario');
        }
    }
    inicio(response) {
        response.render('inicio.ejs');
    }
    vistaCrear(response, parametrosConsulta) {
        response.render('usuario/crear.ejs', {
            datos: {
                mensaje: parametrosConsulta.mensaje,
            },
        });
    }
    async listaUsuarios(response, parametrosConsulta) {
        try {
            const respuesta = await this.usuarioService.buscarMuchos({
                skip: parametrosConsulta.skip ? +parametrosConsulta.skip : undefined,
                take: parametrosConsulta.take ? +parametrosConsulta.take : undefined,
                busqueda: parametrosConsulta.busqueda ? parametrosConsulta.busqueda : undefined,
            });
            console.log(respuesta);
            response.render('usuario/lista.ejs', {
                datos: {
                    usuarios: respuesta,
                    mensaje: parametrosConsulta.mensaje,
                },
            });
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error del servidor');
        }
    }
    obtenerUno(parametrosRuta) {
        this.usuarioService.crearUno({
            apellido: '...',
            fechaCreacion: new Date(),
            nombre: '...',
        });
        this.usuarioService.actualizarUno({
            id: 1,
            data: {
                nombre: '...',
            },
        });
        this.usuarioService.eliminarUno(1);
        return this.usuarioService.buscarUno(+parametrosRuta.idUsuario);
    }
    actualizarUno(params) {
        const objetoWhere = {
            id: Number(params.idUsuario),
        };
        const objetoUsuarioUpdate = {
            apellido: params.apellido,
            nombre: params.nombre,
        };
        const parametrosActualizar = {
            where: objetoWhere,
            data: objetoUsuarioUpdate,
        };
        return this.usuarioService.actualizarUno(params);
    }
    async crearUno(bodyParams) {
        const usuarioCrearDto = new usuario_crear_dto_1.UsuarioCrearDto();
        usuarioCrearDto.nombre = bodyParams.nombre;
        usuarioCrearDto.apellido = bodyParams.apellido;
        usuarioCrearDto.fechaCreacion = bodyParams.fechaCreacion;
        try {
            const errores = await (0, class_validator_1.validate)(usuarioCrearDto);
            if (errores.length > 0) {
                throw new common_1.BadRequestException('No envía bien los parámetros');
            }
            else {
                return this.usuarioService.crearUno(usuarioCrearDto);
            }
        }
        catch (error) {
            console.error({ error: error, mensaje: 'Errores en crear usuario' });
            throw new common_1.InternalServerErrorException('Error servidor');
        }
    }
    eliminarUno(parametro) {
        return this.usuarioService.eliminarUno(+parametro.idUsuario);
    }
};
__decorate([
    (0, common_1.Post)('eliminar-usuario/:idUsuario'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "eliminarUsuario", null);
__decorate([
    (0, common_1.Post)('crear-usuario-formulario'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "crearUsuarioFormulario", null);
__decorate([
    (0, common_1.Get)('inicio'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsuarioController.prototype, "inicio", null);
__decorate([
    (0, common_1.Get)('vista-crear'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UsuarioController.prototype, "vistaCrear", null);
__decorate([
    (0, common_1.Get)('lista-usuarios'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "listaUsuarios", null);
__decorate([
    (0, common_1.Get)(':idUsuario'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsuarioController.prototype, "obtenerUno", null);
__decorate([
    (0, common_1.Put)('/:idUsuario/:apellido/:nombre'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsuarioController.prototype, "actualizarUno", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "crearUno", null);
__decorate([
    (0, common_1.Delete)(':idUsuario'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsuarioController.prototype, "eliminarUno", null);
UsuarioController = __decorate([
    (0, common_1.Controller)('usuario'),
    __metadata("design:paramtypes", [usuario_service_1.UsuarioService])
], UsuarioController);
exports.UsuarioController = UsuarioController;
//# sourceMappingURL=usuario.controller.js.map