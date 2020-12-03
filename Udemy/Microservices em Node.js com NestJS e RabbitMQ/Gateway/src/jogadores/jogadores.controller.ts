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
  UseInterceptors,
  UploadedFile,
  Res,
} from '@nestjs/common'
import { CriarJogadorDto } from './dtos/criar-jogador.dto'
import { AtualizarJogadorDto } from './dtos/atualizar-jogador.dto'
import { Observable } from 'rxjs'
import { ClientProxySmartRanking } from '../proxyrmq/client-proxy'
import { ValidacaoParametrosPipe } from '../common/pipes/validacao-parametros.pipe'
import { FileInterceptor } from '@nestjs/platform-express'

@Controller('api/v1/jogadores')
export class JogadoresController {
  private logger = new Logger(JogadoresController.name)

  constructor(private clientProxySmartRanking: ClientProxySmartRanking) {}

  private clientAdminBackend = this.clientProxySmartRanking.getClientProxyAdminBackendInstance()

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() criarJogadorDto: CriarJogadorDto) {
    const categoria = await this.clientAdminBackend
      .send('consultar-categorias', criarJogadorDto.categoria)
      .toPromise()

    if (categoria) {
      this.clientAdminBackend.emit('criar-jogador', criarJogadorDto)
    } else {
      throw new BadRequestException(`Categoria não cadastrada!`)
    }
  }

  @Get()
  index(@Query('id') id: string): Observable<any> {
    return this.clientAdminBackend.send('consultar-jogadores', id || '')
  }

  @Put('/:id')
  @UsePipes(ValidationPipe)
  async update(
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
  async delete(@Param('id', ValidacaoParametrosPipe) id: string) {
    await this.clientAdminBackend.emit('deletar-jogador', { id })
  }

  @Post('/:id/upload')
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file: any, @Param('id') id: string, @Res() res) {
    const jogador = await this.clientAdminBackend
      .send('consultar-jogadores', id)
      .toPromise()

    if (!jogador) {
      throw new BadRequestException(`Jogador não encontrado!`)
    }

    const atualizarJogadorDto: AtualizarJogadorDto = {}
    atualizarJogadorDto.urlFotoJogador = file.path

    await this.clientAdminBackend.emit('atualizar-jogador', {
      id,
      jogador: atualizarJogadorDto,
    })

    return this.clientAdminBackend.send('consultar-jogadores', id)
  }

  @Get('/:path')
  @UseInterceptors(FileInterceptor('file'))
  async image(@Param('path') path: string, @Res() res) {
    return res.sendFile(path, { root: 'tmp/upload' })
  }
}
