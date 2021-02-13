import { Document } from 'mongoose'
import { Categoria } from '../../categorias/interfaces/categoria.interface'

export interface Jogador extends Document {
    readonly telefoneCelular: string;
    readonly email: string;
    categoria: Categoria;
    nome: string;  
    ranking: string;
    posicaoRanking: number;
    urlFotoJogador: string;
}