import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { CriarJogadorDto } from './dtos/criar-jogador.dto'
import { IJogador } from './interfaces/jogador.interface'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { AtualizarJogadorDto } from './dtos/atualizar-jogador.dto'

@Injectable()
export class JogadoresService {
  @InjectModel('Jogador')
  private readonly jogadorModel: Model<IJogador>

  public async criarJogador(
    criarJogadorDto: CriarJogadorDto,
  ): Promise<IJogador> {
    if (
      await this.jogadorModel.findOne({ email: criarJogadorDto.email }).exec()
    ) {
      throw new BadRequestException(
        `Jogado com e-mail ${criarJogadorDto.email} já existe`,
      )
    }

    return new this.jogadorModel(criarJogadorDto).save()
  }

  public async atualizarJogador(
    id: string,
    atualizarJogadorDto: AtualizarJogadorDto,
  ): Promise<IJogador> {
    const jogador = await this.jogadorModel.findOne({ _id: id }).exec()

    if (!jogador) {
      throw new BadRequestException('Jogador não encontrado para atualizar')
    }

    await jogador.updateOne(atualizarJogadorDto).exec()

    return this.jogadorModel.findOne({ _id: id }).exec()
  }

  public async consultarJogadores(): Promise<IJogador[]> {
    return this.jogadorModel.find().exec()
  }

  public async consultarJogador(id: string): Promise<IJogador> {
    const jogador = await this.jogadorModel.findOne({ _id: id }).exec()

    if (!jogador) {
      throw new NotFoundException('Jogador não encontrado')
    }

    return jogador
  }

  public async deletarJogador(id: string): Promise<any> {
    const jogador = await this.jogadorModel.findOne({ _id: id }).exec()

    if (!jogador) {
      throw new BadRequestException('Jogador não encontrado para deletar')
    }

    await this.jogadorModel.deleteOne({ _id: id }).exec()

    return { _id: id }
  }
}
