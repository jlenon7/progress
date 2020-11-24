import {
  Get,
  Put,
  Body,
  Post,
  Param,
  UsePipes,
  Controller,
  ValidationPipe,
} from '@nestjs/common'
import { CategoriasService } from './categorias.service'
import { ICategoria } from './interfaces/categoria.interface'
import { CriarCategoriaDto } from './dtos/criar-categoria.dto'
import { AtualizarCategoriaDto } from './dtos/atualizar-categoria.dto'
import { ValidacaoParametrosPipe } from 'src/common/pipes/validacao-parametros.pipe'

@Controller('api/v1/categorias')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @Post()
  @UsePipes(ValidationPipe)
  public async criarCategoria(
    @Body() criarCategoriaDto: CriarCategoriaDto,
  ): Promise<ICategoria> {
    return this.categoriasService.criarCategoria(criarCategoriaDto)
  }

  @Get()
  public async consultarCategorias(): Promise<ICategoria[]> {
    return this.categoriasService.consultarCategorias()
  }

  @Get('/:categoria')
  public async consultarCategoria(
    @Param('categoria', ValidacaoParametrosPipe) categoria: string,
  ): Promise<ICategoria> {
    return this.categoriasService.consultarCategoria(categoria)
  }

  @Put('/:categoria')
  @UsePipes(ValidationPipe)
  public async atualizarCategoria(
    @Param('categoria', ValidacaoParametrosPipe) categoria: string,
    @Body() atualizarCategoriaDto: AtualizarCategoriaDto,
  ): Promise<ICategoria> {
    return this.categoriasService.atualizarCategoria(
      categoria,
      atualizarCategoriaDto,
    )
  }

  @Post('/:categoria/jogadores/:idJogador')
  public async atribuirCategoriaJogador(
    @Param(ValidacaoParametrosPipe) params: string[],
  ): Promise<ICategoria> {
    return this.categoriasService.atribuirCategoriaJogador(
      params['categoria'],
      params['idJogador'],
    )
  }
}
