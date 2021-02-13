import { IsOptional } from 'class-validator'

export class AtualizarJogadorDto {

    @IsOptional()
    categoria?: string;

    @IsOptional()
    urlFotoJogador?: string;
}