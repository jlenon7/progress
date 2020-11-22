import { Injectable, Logger } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { IJogador } from './interfaces/jogador.interface';
import { uuid } from 'uuidv4'

@Injectable()
export class JogadoresService {
  private jogadores: IJogador[] = []
  private readonly logger = new Logger(JogadoresService.name)

  async criarAtualizarJogador(criarJogadorDto: CriarJogadorDto): Promise<void> {
    this.criar(criarJogadorDto)

    this.logger.log(`Total de jogadores: ${this.jogadores.length}`)
  }

  private criar(criarJogadorDto: CriarJogadorDto): void {
    const { nome, telefoneCelular, email } = criarJogadorDto

    const jogador: IJogador = {
      _id: uuid(),
      nome,
      telefoneCelular,
      email,
      ranking: 'A',
      posicaoRanking: 1,
      urlFotoJogador: 'www.google.com.br/foto123.jpg'
    }

    this.logger.log(`Novo Jogador: ${jogador}`)

    this.jogadores.push(jogador)
  }
}
