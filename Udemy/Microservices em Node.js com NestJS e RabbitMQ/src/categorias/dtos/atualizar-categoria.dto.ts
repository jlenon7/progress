import { IsString, IsOptional, IsArray, ArrayMinSize } from 'class-validator'
import { IEvento } from '../interfaces/categoria.interface'

export class AtualizarCategoriaDto {
  @IsString()
  @IsOptional()
  descricao: string

  @IsArray()
  @ArrayMinSize(1)
  eventos: IEvento[]
}
