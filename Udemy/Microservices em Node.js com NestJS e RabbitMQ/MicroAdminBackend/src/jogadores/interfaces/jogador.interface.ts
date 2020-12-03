import { Document } from 'mongoose'
import { ICategoria } from '../../categorias/interfaces/categoria.interface'

export interface IJogador extends Document {
  readonly telefoneCelular: string
  readonly email: string
  categoria: ICategoria
  nome: string
  ranking: string
  posicaoRanking: number
  urlFotoJogador: string
}
