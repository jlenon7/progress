import { Injectable, Logger } from '@nestjs/common'
import { RpcException } from '@nestjs/microservices'
import { InjectModel } from '@nestjs/mongoose/dist/common/mongoose.decorators'
import { Model } from 'mongoose'
import { ICategoria } from './interfaces/categorias/categoria.interface'
import { IJogador } from './interfaces/jogadores/jogador.interface'

@Injectable()
export class AppService {
  private logger = new Logger('AppService')

  @InjectModel('Categoria') private readonly categoriaModel: Model<ICategoria>
  @InjectModel('Jogador') private readonly jogadorModel: Model<IJogador>

  public async getCategoria(id: string): Promise<ICategoria> {
    try {
      return this.categoriaModel.findOne({ _id: id }).exec()
    } catch (error) {
      this.logger.error(`Error: ${JSON.stringify(error.message)}`)

      throw new RpcException(error.message)
    }
  }

  public async getCategorias(): Promise<ICategoria[]> {
    try {
      return this.categoriaModel.find().exec()
    } catch (error) {
      this.logger.error(`Error: ${JSON.stringify(error.message)}`)

      throw new RpcException(error.message)
    }
  }

  public async storeCategoria(categoria: ICategoria): Promise<void> {
    try {
      await new this.categoriaModel(categoria).save()
    } catch (error) {
      this.logger.error(`Error: ${JSON.stringify(error.message)}`)

      throw new RpcException(error.message)
    }
  }

  public async updateCategoria(
    id: string,
    categoria: ICategoria,
  ): Promise<void> {
    try {
      await this.categoriaModel
        .findOneAndUpdate({ _id: id }, { $set: categoria })
        .exec()
    } catch (error) {
      this.logger.error(`Error: ${JSON.stringify(error.message)}`)

      throw new RpcException(error.message)
    }
  }
}
