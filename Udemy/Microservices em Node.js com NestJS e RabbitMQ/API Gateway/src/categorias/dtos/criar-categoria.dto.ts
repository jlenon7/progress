import { IsString, IsNotEmpty, IsArray, ArrayMinSize } from "class-validator";

export class CriarCategoriaDto {

    @IsString()
    @IsNotEmpty()
    readonly categoria: string;

    @IsString()
    @IsNotEmpty()
    descricao: string;

    @IsArray()
    @ArrayMinSize(1)
    eventos: Array<Evento>

}

interface Evento {
    nome: string;
    operacao: string;
    valor: number;
}