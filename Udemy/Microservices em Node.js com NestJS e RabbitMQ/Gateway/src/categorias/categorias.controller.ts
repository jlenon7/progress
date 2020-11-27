import {
  Controller,
  Get,
  Logger,
  Post,
  UsePipes,
  ValidationPipe,
  Body,
  Query,
  Put,
  Param,
} from '@nestjs/common'
import { CriarCategoriaDto } from './dtos/criar-categoria.dto'
import { AtualizarCategoriaDto } from './dtos/atualizar-categoria.dto'
import { Observable } from 'rxjs'
import { ClientProxySmartRanking } from '../proxyrmq/client-proxy'

@Controller('api/v1/categorias')
export class CategoriasController {
  private logger = new Logger(CategoriasController.name)

  constructor(private clientProxySmartRanking: ClientProxySmartRanking) {}

  private clientAdminBackend = this.clientProxySmartRanking.getClientProxyAdminBackendInstance()

  @Post()
  @UsePipes(ValidationPipe)
  public criarCategoria(@Body() criarCategoriaDto: CriarCategoriaDto) {
    this.clientAdminBackend.emit('criar-categoria', criarCategoriaDto)
  }

  @Get()
  public consultarCategorias(@Query('id') id: string): Observable<any> {
    return this.clientAdminBackend.send('consultar-categorias', id || '')
  }

  @Put('/:id')
  @UsePipes(ValidationPipe)
  atualizarCategoria(
    @Body() atualizarCategoriaDto: AtualizarCategoriaDto,
    @Param('id') id: string,
  ) {
    this.clientAdminBackend.emit('atualizar-categoria', {
      id: id,
      categoria: atualizarCategoriaDto,
    })
  }
}
