import { Controller, Get, Logger, Post, UsePipes, ValidationPipe, Body, Query, Put, Param, BadRequestException, Delete, UseInterceptors, UploadedFile, UseGuards, Req } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { AtualizarJogadorDto } from './dtos/atualizar-jogador.dto'
import { Observable } from 'rxjs';
import { ClientProxySmartRanking } from '../proxyrmq/client-proxy'
import { ValidacaoParametrosPipe } from '../common/pipes/validacao-parametros.pipe'
import { FileInterceptor } from '@nestjs/platform-express'
import { AwsService } from '../aws/aws.service'
import { Jogador } from '../jogadores/interfaces/jogador.interface'
import { Categoria } from '../categorias/interfaces/categoria.interface'
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express'

@Controller('api/v1/jogadores')
export class JogadoresController {

  private logger = new Logger(JogadoresController.name)

  constructor(
    private clientProxySmartRanking: ClientProxySmartRanking,
    private awsService: AwsService
  ) {}

  private clientAdminBackend = 
              this.clientProxySmartRanking.getClientProxyAdminBackendInstance()

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @UsePipes(ValidationPipe)
  async criarJogador(
      @Body() criarJogadorDto: CriarJogadorDto) {

      this.logger.log(`criarJogadorDto: ${JSON.stringify(criarJogadorDto)}`)          
      
      const categoria: Categoria = await this.clientAdminBackend.send('consultar-categorias', 
      criarJogadorDto.categoria).toPromise()

      if (categoria) {
        await this.clientAdminBackend.emit('criar-jogador', criarJogadorDto)
      } else {
        throw new BadRequestException(`Categoria não cadastrada!`)
      }
  }

  @Post('/:_id/upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadArquivo (
    @UploadedFile() file,
    @Param('_id') _id: string) {

      //Verificar se o jogador está cadastrado
      const jogador: Jogador = await this.clientAdminBackend.send('consultar-jogadores', _id).toPromise()

      if (!jogador) {
        throw new BadRequestException(`Jogador não encontrado!`)
      }

      //Enviar o arquivo para o S3 e recuperar a URL de acesso
      const urlFotoJogador: {url: ''} = await this.awsService.uploadArquivo(file, _id)

      //Atualizar o atributo URL da entidade jogador
      const atualizarJogadorDto: AtualizarJogadorDto = { }
      atualizarJogadorDto.urlFotoJogador = urlFotoJogador.url

      await this.clientAdminBackend.emit('atualizar-jogador', {id: _id, jogador: atualizarJogadorDto})

      //Retornar o jogador atualizado para o cliente
      return this.clientAdminBackend.send('consultar-jogadores', _id)
    

  }

   @UseGuards(AuthGuard('jwt'))
   @Get()
   consultarJogadores(
    @Req() req: Request,
    @Query('idJogador') _id: string
     ): Observable<any> {    
      this.logger.log(`req: ${JSON.stringify(req.user)}`)
     return this.clientAdminBackend.send('consultar-jogadores', _id ? _id: '')

   }

   @Put('/:_id')
   @UsePipes(ValidationPipe)
   async atualizarJogador(
       @Body() atualizarJogadorDto: AtualizarJogadorDto, 
       @Param('_id', ValidacaoParametrosPipe) _id: string) {

        const categoria: Categoria = await this.clientAdminBackend.send('consultar-categorias', 
        atualizarJogadorDto.categoria).toPromise()

        if (categoria) {
        await this.clientAdminBackend.emit('atualizar-jogador', { id: _id, jogador: atualizarJogadorDto } )
   } else {
    throw new BadRequestException(`Categoria não cadastrada!`)
   }
  }

   @Delete('/:_id')
   async deletarJogador(
       @Param('_id', ValidacaoParametrosPipe) _id: string) {
          await this.clientAdminBackend.emit('deletar-jogador', { _id })
       } 


}