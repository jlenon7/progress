import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { IJogador } from './interfaces/jogador.interface';
import { uuid } from 'uuidv4'

@Injectable()
export class JogadoresService {
  private jogadores: IJogador[] = []
  private readonly logger = new Logger(JogadoresService.name)

  public async criarAtualizarJogador(criarJogadorDto: CriarJogadorDto): Promise<void> {
    const { email } = criarJogadorDto

    const jogadorEncontrado = this.jogadores.find(jogador => jogador.email === email)

    if (jogadorEncontrado) {
      return this.atualizar(jogadorEncontrado, criarJogadorDto)
    }
    
    await this.criar(criarJogadorDto)

    this.logger.log(`Total de jogadores: ${this.jogadores.length}`)
  }

  private async criar(criarJogadorDto: CriarJogadorDto): Promise<void> {
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

  private async atualizar(jogador: IJogador, criarJogadorDto: CriarJogadorDto): Promise<void> {
    const { nome } = criarJogadorDto

    jogador.nome = nome
  }

  public async consultarJogadores(): Promise<IJogador[]> {
    return this.jogadores
  }

  public async consultarJogador(email: string): Promise<IJogador> {
    const jogador = this.jogadores.find(jogador => jogador.email === email)

    if (!jogador) {
      throw new NotFoundException(`Jogador com e-mail ${email} não encontrado`)
    }

    return jogador
  }

  public async deletarJogador(email: string): Promise<void> {
    const jogadorEncontrado = await this.jogadores.find(jogador => jogador.email === email)

    const index = await this.jogadores.indexOf(jogadorEncontrado)
    
    this.jogadores.splice(index, 1)

    this.logger.log(`Total de jogadores: ${this.jogadores.length}`)
  }
}
