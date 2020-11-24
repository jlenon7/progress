import { Controller, Post, UsePipes, ValidationPipe, Body, Get, Query, Put, Param, Delete, Logger } from '@nestjs/common';
import { DesafiosService } from './desafios.service'
import { CriarDesafioDto } from './dtos/criar-desafio.dto'
import { IDesafio } from './interfaces/desafio.interface';
import { DesafioStatusValidacaoPipe } from './pipes/desafio-status-validation.pipe';
import { AtribuirDesafioPartidaDto } from './dtos/atribuir-desafio-partida.dto';
import { AtualizarDesafioDto } from './dtos/atualizar-desafio.dto';

@Controller('api/v1/desafios')
export class DesafiosController {

    constructor(private readonly desafiosService: DesafiosService){}

    private readonly logger = new Logger(DesafiosController.name)

    @Post()
    @UsePipes(ValidationPipe)
    async criarDesafio(
        @Body() criarDesafioDto: CriarDesafioDto): Promise<IDesafio> {
            this.logger.log(`criarDesafioDto: ${JSON.stringify(criarDesafioDto)}`)
            return await this.desafiosService.criarDesafio(criarDesafioDto)
    }
    
    @Get()
    async consultarDesafios(
        @Query('idJogador') _id: string): Promise<IDesafio[]> {
        return _id ? await this.desafiosService.consultarDesafiosDeUmJogador(_id) 
        : await this.desafiosService.consultarTodosDesafios()
    }

    @Put('/:desafio')
    async atualizarDesafio(
        @Body(DesafioStatusValidacaoPipe) atualizarDesafioDto: AtualizarDesafioDto,
        @Param('desafio') _id: string): Promise<void> {
            await this.desafiosService.atualizarDesafio(_id, atualizarDesafioDto)

        }    

   @Post('/:desafio/partida/')
   async atribuirDesafioPartida(
       @Body(ValidationPipe) atribuirDesafioPartidaDto: AtribuirDesafioPartidaDto,
       @Param('desafio') _id: string): Promise<void> {
        return await this.desafiosService.atribuirDesafioPartida(_id, atribuirDesafioPartidaDto)           
   }

   @Delete('/:_id')
   async deletarDesafio(
       @Param('_id') _id: string): Promise<void> {
           this.desafiosService.deletarDesafio(_id)
    }

}
