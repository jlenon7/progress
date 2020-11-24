import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { ICategoria } from './interfaces/categoria.interface'
import { CriarCategoriaDto } from './dtos/criar-categoria.dto'
import { BadRequestException, Inject, Injectable } from '@nestjs/common'
import { AtualizarCategoriaDto } from './dtos/atualizar-categoria.dto'
import { IJogador } from 'src/jogadores/interfaces/jogador.interface'
import { JogadoresService } from 'src/jogadores/jogadores.service'

@Injectable()
export class CategoriasService {
  @InjectModel('Categoria') private readonly categoriaModel: Model<ICategoria>
  @Inject('JogadoresService')
  private readonly jogadoresService: JogadoresService

  public async criarCategoria(
    criarCategoriaDto: CriarCategoriaDto,
  ): Promise<ICategoria> {
    const { categoria } = criarCategoriaDto

    if (await this.categoriaModel.findOne({ categoria }).exec()) {
      throw new BadRequestException('Categoria já cadastrada')
    }

    return new this.categoriaModel(criarCategoriaDto).save()
  }

  public async consultarCategorias(): Promise<ICategoria[]> {
    return this.categoriaModel.find().populate('jogadores').exec()
  }

  public async consultarCategoria(categoria: string): Promise<ICategoria> {
    const categoriaEncontrada = await this.categoriaModel
      .findOne({ categoria })
      .exec()

    if (!categoriaEncontrada) {
      throw new BadRequestException('Categoria não encontrada ao listar')
    }

    return categoriaEncontrada
  }

  public async atualizarCategoria(
    categoria: string,
    atualizarCategoriaDto: AtualizarCategoriaDto,
  ): Promise<ICategoria> {
    const categoriaEncontrada = await this.categoriaModel
      .findOne({ categoria })
      .exec()

    if (!categoriaEncontrada) {
      throw new BadRequestException('Categoria não encontrada ao atualizar')
    }

    await categoriaEncontrada.updateOne(atualizarCategoriaDto).exec()

    return this.categoriaModel.findOne({ _id: categoriaEncontrada._id }).exec()
  }

  public async atribuirCategoriaJogador(
    categoria: string,
    idJogador: string,
  ): Promise<ICategoria> {
    const categoriaEncontrada = await this.categoriaModel
      .findOne({ categoria })
      .exec()

    if (!categoriaEncontrada) {
      throw new BadRequestException(
        'Categoria não encontrada ao atribuir um jogador',
      )
    }

    if (
      categoriaEncontrada.jogadores.find(
        jogador => jogador.toJSON() === idJogador,
      )
    ) {
      throw new BadRequestException('Jogador já cadastrado nessa categória')
    }

    categoriaEncontrada.jogadores.push(
      await this.jogadoresService.consultarJogador(idJogador),
    )
    await categoriaEncontrada.updateOne(categoriaEncontrada).exec()

    return this.categoriaModel
      .findOne({ categoria })
      .populate('jogadores')
      .exec()
  }

  public async consultarCategoriaJogador(idJogador: any): Promise<ICategoria> {
    const jogadores = await this.jogadoresService.consultarJogadores()

    const jogadorFilter = jogadores.filter(jogador => jogador._id === idJogador)

    if (jogadorFilter.length === 0) {
      throw new BadRequestException(`O id ${idJogador} não é um jogador!`)
    }

    return await this.categoriaModel
      .findOne()
      .where('jogadores')
      .in(idJogador)
      .exec()
  }
}
