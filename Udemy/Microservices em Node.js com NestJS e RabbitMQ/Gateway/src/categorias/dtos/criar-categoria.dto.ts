import { ArrayMinSize, IsArray, IsNotEmpty, IsString } from 'class-validator'

export class CriarCategoriaDto {
  @IsString()
  @IsNotEmpty()
  readonly categoria: string

  @IsString()
  @IsNotEmpty()
  descricao: string

  @IsArray()
  @ArrayMinSize(1)
  eventos: IEvento[]
}

interface IEvento {
  nome: string
  operacao: string
  valor: number
}
