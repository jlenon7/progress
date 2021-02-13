import { Document } from 'mongoose';

export interface Categoria extends Document {

    readonly categoria: string;
    descricao: string;
    eventos: Array<Evento>;
    
}

interface Evento {
    nome: string;
    operacao: string;
    valor: number;
}