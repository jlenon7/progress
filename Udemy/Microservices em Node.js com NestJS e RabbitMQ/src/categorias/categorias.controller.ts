import { Body, Controller, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { JogadoresService } from 'src/jogadores/jogadores.service';
import { CategoriasService } from './categorias.service';
import { AtualizarCategoriaDto } from './dtos/atualizar-categoria.dto';
import { CriarCategoriaDto } from './dtos/criar-categoria.dto';
import { ICategoria } from './interfaces/categoria.interface';

@Controller('api/v1/categorias')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}
  
  @Post()
  @UsePipes(ValidationPipe)
  public async criarCategoria(@Body() criarCategoriaDto: CriarCategoriaDto): Promise<ICategoria> {
    return this.categoriasService.criarCategoria(criarCategoriaDto)
  }

  @Get()
  public async consultarCategorias(): Promise<ICategoria[]> {
    return this.categoriasService.consultarCategorias()
  }

  @Get('/:categoria')
  public async consultarCategoria(@Param('categoria') categoria: string): Promise<ICategoria> {
    return this.categoriasService.consultarCategoria(categoria)
  }

  @Put('/:categoria')
  @UsePipes(ValidationPipe)
  public async atualizarCategoria(@Param('categoria') categoria: string, @Body() atualizarCategoriaDto: AtualizarCategoriaDto): Promise<ICategoria> {
    return this.categoriasService.atualizarCategoria(categoria, atualizarCategoriaDto)
  }

  @Post('/:categoria/jogadores/:idJogador')
  public async atribuirCategoriaJogador(@Param() params: string[]): Promise<ICategoria> {
    return this.categoriasService.atribuirCategoriaJogador(params['categoria'], params['idJogador'])
  }
}
