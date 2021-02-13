export interface Jogador  {
    readonly _id: string;
    readonly telefoneCelular: string;
    readonly email: string;
    categoria: string;
    nome: string;  
    ranking: string;
    posicaoRanking: number;
    urlFotoJogador: string;
}
