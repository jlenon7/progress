export interface RankingResponse {

    jogador?: string
    posicao?: number
    pontuacao?: number
    historicoPartidas?: Historico
    
}

export interface Historico {
    vitorias?: number
    derrotas?: number
}