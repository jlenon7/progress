import { ArrayMinSize, IsArray, IsNotEmpty, IsString } from "class-validator";
import { IEvento } from "../interfaces/categoria.interface";

export class CriarCategoriaDto {
  @IsString()
  @IsNotEmpty()
  readonly categoria: string

  @IsString()
  @IsNotEmpty()
  descricao: string

  @IsArray()
  @ArrayMinSize(1)
  eventos: Array<IEvento>
}