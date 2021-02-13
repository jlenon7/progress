export interface Categoria {
    readonly _id: string;
    readonly categoria: string;
    descricao: string;
    eventos: Array<Evento>;
    
}

interface Evento {
    nome: string;
    operacao: string;
    valor: number;
}