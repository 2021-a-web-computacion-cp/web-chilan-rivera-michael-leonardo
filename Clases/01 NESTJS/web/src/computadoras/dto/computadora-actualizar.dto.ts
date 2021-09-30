import {
    IsBoolean,
  IsNotEmpty,
    IsNumber,
    IsPositive,
    Max,
} from 'class-validator';

export class ComputadoraActualizarDto {
    @IsNotEmpty()
    @IsPositive()
    precio: number;

    @IsNotEmpty()
    @IsBoolean()
    disponible: boolean;

    @IsNotEmpty()
    @IsNumber()
    @Max(100)
    cantidad: number;
}