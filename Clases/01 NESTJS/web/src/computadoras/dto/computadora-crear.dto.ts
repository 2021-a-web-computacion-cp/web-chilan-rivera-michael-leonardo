import {
    IsBoolean,
    IsEmpty,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsPositive,
    IsString,
    Max,
    MaxLength,
    MinLength
} from 'class-validator';

export class ComputadoraCrearDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @MaxLength(10)
    marca: string;

    @IsOptional()
    @IsString()
    @MinLength(2)
    @MaxLength(6)
    tipo: string;

    @IsNotEmpty()
    @IsPositive()
    precio: number;

    @IsEmpty()
    fechaSubida: Date;

    @IsNotEmpty()
    @IsBoolean()
    disponible: boolean;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    @Max(100)
    cantidad: number
}