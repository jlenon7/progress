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
  BadRequestException,
  Delete,
} from '@nestjs/common'
import { CriarJogadorDto } from './dtos/criar-jogador.dto'
import { AtualizarJogadorDto } from './dtos/atualizar-jogador.dto'
import { Observable } from 'rxjs'
import { ClientProxySmartRanking } from '../proxyrmq/client-proxy'
import { ValidacaoParametrosPipe } from '../common/pipes/validacao-parametros.pipe'

@Controller('api/v1/jogadores')
export class JogadoresController {
  private logger = new Logger(JogadoresController.name)

  constructor(private clientProxySmartRanking: ClientProxySmartRanking) {}

  private clientAdminBackend = this.clientProxySmartRanking.getClientProxyAdminBackendInstance()

  @Post()
  @UsePipes(ValidationPipe)
  async criarJogador(@Body() criarJogadorDto: CriarJogadorDto) {
    this.logger.log(`criarJogadorDto: ${JSON.stringify(criarJogadorDto)}`)

    const categoria = await this.clientAdminBackend
      .send('consultar-categorias', criarJogadorDto.categoria)
      .toPromise()

    if (categoria) {
      await this.clientAdminBackend.emit('criar-jogador', criarJogadorDto)
    } else {
      throw new BadRequestException(`Categoria não cadastrada!`)
    }
  }

  @Get()
  consultarJogadores(@Query('id') id: string): Observable<any> {
    return this.clientAdminBackend.send('consultar-jogadores', id || '')
  }

  @Put('/:id')
  @UsePipes(ValidationPipe)
  async atualizarJogador(
    @Body() atualizarJogadorDto: AtualizarJogadorDto,
    @Param('id', ValidacaoParametrosPipe) id: string,
  ) {
    const categoria = await this.clientAdminBackend
      .send('consultar-categorias', atualizarJogadorDto.categoria)
      .toPromise()

    if (categoria) {
      await this.clientAdminBackend.emit('atualizar-jogador', {
        id,
        jogador: atualizarJogadorDto,
      })
    } else {
      throw new BadRequestException(`Categoria não cadastrada!`)
    }
  }

  @Delete('/:id')
  async deletarJogador(@Param('id', ValidacaoParametrosPipe) id: string) {
    await this.clientAdminBackend.emit('deletar-jogador', { id })
  }
}
