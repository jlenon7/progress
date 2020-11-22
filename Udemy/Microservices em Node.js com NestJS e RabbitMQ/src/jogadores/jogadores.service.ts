import { Injectable, NotFoundException } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { IJogador } from './interfaces/jogador.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JogadoresService {
  @InjectModel('Jogador')
  private readonly jogadorModel: Model<IJogador>

  public async criarAtualizarJogador(criarJogadorDto: CriarJogadorDto): Promise<IJogador> {
    const { email, telefoneCelular } = criarJogadorDto

    const jogadorEncontrado = await this.jogadorModel.findOne({ email, telefoneCelular }).exec()

    if (jogadorEncontrado) {
      return this.atualizar(jogadorEncontrado, criarJogadorDto)
    }
    
    return this.criar(criarJogadorDto)
  }

  private async criar(criarJogadorDto: CriarJogadorDto): Promise<IJogador> {
    const jogador = new this.jogadorModel(criarJogadorDto)

    return jogador.save()
  }

  private async atualizar(jogador: IJogador, criarJogadorDto: CriarJogadorDto): Promise<IJogador> {
    return this.jogadorModel.findOneAndUpdate({ email: jogador.email }, { $set: criarJogadorDto }).exec()
  }

  public async consultarJogadores(): Promise<IJogador[]> {
    return this.jogadorModel.find().exec()
  }

  public async consultarJogador(email: string): Promise<IJogador> {
    const jogador = await this.jogadorModel.findOne({ email }).exec()

    if (!jogador) {
      throw new NotFoundException(`Jogador com e-mail ${email} não encontrado`)
    }

    return jogador
  }

  public async deletarJogador(email: string): Promise<any> {
    return this.jogadorModel.deleteOne({ email }).exec()
  }
}
