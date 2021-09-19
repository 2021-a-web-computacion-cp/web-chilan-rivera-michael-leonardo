import {Injectable} from "@nestjs/common";
import {PrismaService} from "../prisma.service";
import {Prisma} from '@prisma/client';

@Injectable()
export class UsuarioService {
    //Métodos para consultar
    constructor( // inyectar dependencias
        private prisma: PrismaService,
    ) {}

    buscarUno(id: number){
        return this.prisma.ePN_USUARIO.findUnique({
            where: {
                id: id,
            },
        });
    }
    crearUno(usuario: Prisma.EPN_USUARIOCreateInput){
        return this.prisma.ePN_USUARIO.create({
            data: usuario,
        });
    }
    actualizarUno(parametrosActualizar:{
        id: number;
        data: Prisma.EPN_USUARIOUpdateInput;
    }) {
        return this.prisma.ePN_USUARIO.update({
            data: parametrosActualizar.data,
            where: {id : parametrosActualizar.id,}
        });
    }
    eliminarUno(id: number){
        return this.prisma.ePN_USUARIO.delete({
            where: {id: id},
        });
    }
}