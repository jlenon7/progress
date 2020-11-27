import { Injectable, Logger } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { IJogador } from './interfaces/jogador.interface'
import { RpcException } from '@nestjs/microservices'

@Injectable()
export class JogadoresService {
  constructor(
    @InjectModel('Jogador') private readonly jogadorModel: Model<IJogador>,
  ) {}

  private readonly logger = new Logger('JogadoresService')

  async getJogadores(): Promise<IJogador[]> {
    try {
      return this.jogadorModel.find().populate('categoria').exec()
    } catch (error) {
      this.logger.error(`error: ${JSON.stringify(error.message)}`)
      throw new RpcException(error.message)
    }
  }

  async storeJogador(jogador: IJogador): Promise<void> {
    try {
      const jogadorCriado = new this.jogadorModel(jogador)

      await jogadorCriado.save()
    } catch (error) {
      this.logger.error(`error: ${JSON.stringify(error.message)}`)

      throw new RpcException(error.message)
    }
  }

  async getJogador(id: string): Promise<IJogador> {
    try {
      return this.jogadorModel.findOne({ _id: id }).populate('categoria').exec()
    } catch (error) {
      this.logger.error(`error: ${JSON.stringify(error.message)}`)

      throw new RpcException(error.message)
    }
  }

  async updateJogador(id: string, jogador: IJogador): Promise<void> {
    try {
      await this.jogadorModel
        .findOneAndUpdate({ _id: id }, { $set: jogador })
        .exec()
    } catch (error) {
      this.logger.error(`error: ${JSON.stringify(error.message)}`)

      throw new RpcException(error.message)
    }
  }

  async deleteJogador(id): Promise<void> {
    try {
      await this.jogadorModel.deleteOne({ _id: id }).exec()
    } catch (error) {
      this.logger.error(`error: ${JSON.stringify(error.message)}`)

      throw new RpcException(error.message)
    }
  }
}
