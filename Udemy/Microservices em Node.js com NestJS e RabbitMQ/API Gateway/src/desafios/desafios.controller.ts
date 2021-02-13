import { Controller, Post, UsePipes, ValidationPipe, Body, Get, Query, Put, Param, Delete, Logger, BadRequestException } from '@nestjs/common';
import { CriarDesafioDto } from './dtos/criar-desafio.dto'
import { DesafioStatusValidacaoPipe } from './pipes/desafio-status-validation.pipe';
import { AtribuirDesafioPartidaDto } from './dtos/atribuir-desafio-partida.dto';
import { AtualizarDesafioDto } from './dtos/atualizar-desafio.dto';
import { ClientProxySmartRanking } from '../proxyrmq/client-proxy'
import { Jogador } from '../jogadores/interfaces/jogador.interface'
import { Desafio } from '../desafios/interfaces/desafio.interface'
import { DesafioStatus } from './desafio-status.enum'
import { Partida } from './interfaces/partida.interface'

@Controller('api/v1/desafios')
export class DesafiosController {

    constructor(
      private clientProxySmartRanking: ClientProxySmartRanking
    ) {}

    private readonly logger = new Logger(DesafiosController.name)

    /*
        Criamos um proxy específico para lidar com o microservice
        desafios
    */
    private clientDesafios = 
    this.clientProxySmartRanking.getClientProxyDesafiosInstance()

    private clientAdminBackend = 
    this.clientProxySmartRanking.getClientProxyAdminBackendInstance()

    @Post()
    @UsePipes(ValidationPipe)
    async criarDesafio(
        @Body() criarDesafioDto: CriarDesafioDto) {
            this.logger.log(`criarDesafioDto: ${JSON.stringify(criarDesafioDto)}`)
          
            /*
                Validações relacionadas ao array de jogadores que participam
                do desafio
            */
            const jogadores: Jogador[] = await this.clientAdminBackend.send('consultar-jogadores', '').toPromise()                  

            criarDesafioDto.jogadores.map(jogadorDto => {
                const jogadorFilter: Jogador[] = jogadores.filter( jogador => jogador._id == jogadorDto._id )
    
                this.logger.log(`jogadorFilter: ${JSON.stringify(jogadorFilter)}`)  

                /*
                    Verificamos se os jogadores do desafio estão cadastrados
                */
                if (jogadorFilter.length == 0) {
                    throw new BadRequestException(`O id ${jogadorDto._id} não é um jogador!`)
                }
                
                /*
                    Verificar se os jogadores fazem parte da categoria informada no
                    desafio 
                */
                if (jogadorFilter[0].categoria != criarDesafioDto.categoria) {

                    throw new BadRequestException(`O jogador ${jogadorFilter[0]._id} não faz parte da categoria informada!`)

                }
            
            })

            /*
                Verificamos se o solicitante é um jogador da partida
            */
            const solicitanteEhJogadorDaPartida: Jogador[] = criarDesafioDto.jogadores.filter(jogador => jogador._id == criarDesafioDto.solicitante )

            this.logger.log(`solicitanteEhJogadorDaPartida: ${JSON.stringify(solicitanteEhJogadorDaPartida)}`)

            if(solicitanteEhJogadorDaPartida.length == 0) {
                throw new BadRequestException(`O solicitante deve ser um jogador da partida!`)
            }

            /*
                Verificamos se a categoria está cadastrada
            */
            const categoria = await this.clientAdminBackend.send('consultar-categorias', criarDesafioDto.categoria).toPromise()

            this.logger.log(`categoria: ${JSON.stringify(categoria)}`)

            if (!categoria) {
                throw new BadRequestException(`Categoria informada não existe!`)
            }

            await this.clientDesafios.emit('criar-desafio', criarDesafioDto)
    }
    
    @Get()
    async consultarDesafios(
        @Query('idJogador') idJogador: string): Promise<any> {

        /*
            Verificamos se o jogador informado está cadastrado
        */
        if ( idJogador ) {
            const jogador: Jogador = await this.clientAdminBackend.send('consultar-jogadores', idJogador ).toPromise()
            this.logger.log(`jogador: ${JSON.stringify(jogador)}`)
            if (!jogador) {
                throw new BadRequestException(`Jogador não cadastrado!`)

            }
        }
        /*
            No microservice desafios, o método responsável por consultar os desafios
            espera a estrutura abaixo, onde:
            - Se preenchermos o idJogador a consulta de desafios será pelo id do 
            jogador informado
            - Se preenchermos o campo _id a consulta será pelo id do desafio
            - Se não preenchermos nenhum dos dois campos a consulta irá retornar
            todos os desafios cadastrados
        */
        return this.clientDesafios.send('consultar-desafios', { idJogador: idJogador , _id: '' }).toPromise()
    }

    @Put('/:desafio')
    async atualizarDesafio(
        @Body(DesafioStatusValidacaoPipe) atualizarDesafioDto: AtualizarDesafioDto,
        @Param('desafio') _id: string) {

            /*
                Validações em relação ao desafio
            */
            
            const desafio: Desafio = await this.clientDesafios.send('consultar-desafios', { idJogador: '', _id: _id }).toPromise()

            this.logger.log(`desafio: ${JSON.stringify(desafio)}`)
            
            /*
                Verificamos se o desafio está cadastrado
            */
            if (!desafio) {

                throw new BadRequestException(`Desafio não cadastrado!`)

            }

            /*
                Somente podem ser atualizados desafios com status PENDENTE
            */
            if (desafio.status != DesafioStatus.PENDENTE) {

                throw new BadRequestException ('Somente desafios com status PENDENTE podem ser atualizados!')

            }

            await this.clientDesafios.emit('atualizar-desafio', { id: _id, desafio: atualizarDesafioDto } )

        }    

   @Post('/:desafio/partida/')
   async atribuirDesafioPartida(
       @Body(ValidationPipe) atribuirDesafioPartidaDto: AtribuirDesafioPartidaDto,
       @Param('desafio') _id: string) {
            
        const desafio: Desafio = await this.clientDesafios.send('consultar-desafios', { idJogador: '', _id: _id }).toPromise()

        this.logger.log(`desafio: ${JSON.stringify(desafio)}`)
            
        /*
            Verificamos se o desafio está cadastrado
        */
        if (!desafio) {

            throw new BadRequestException(`Desafio não cadastrado!`)

            }

        /*
            Verificamos se o desafio já foi realizado
        */

        if (desafio.status == DesafioStatus.REALIZADO) {
           
            throw new BadRequestException(`Desafio já realizado!`)
            
        }

        /*
            Somente deve ser possível lançar uma partida para um desafio
            com status ACEITO
        */

        if ( desafio.status != DesafioStatus.ACEITO) {

            throw new BadRequestException(`Partidas somente podem ser lançadas em desafios aceitos pelos adversários!`)

        }

        /*
            Verificamos se o jogador informado faz parte do desafio
        */
       if (!desafio.jogadores.includes(atribuirDesafioPartidaDto.def)) {

            throw new BadRequestException(`O jogador vencedor da partida deve fazer parte do desafio!`)

       }

        /*
            Criamos nosso objeto partida, que é formado pelas
            informações presentes no Dto que recebemos e por informações
            presentes no objeto desafio que recuperamos 
        */
        const partida: Partida = { } 
        partida.categoria = desafio.categoria
        partida.def = atribuirDesafioPartidaDto.def
        partida.desafio = _id
        partida.jogadores = desafio.jogadores
        partida.resultado = atribuirDesafioPartidaDto.resultado

        /*
            Enviamos a partida para o tópico 'criar-partida'
            Este tópico é responsável por persitir a partida na 
            collection Partidas
        */
        await this.clientDesafios.emit('criar-partida', partida)
   
    }

   @Delete('/:_id')
   async deletarDesafio(
       @Param('_id') _id: string) {
            
        const desafio: Desafio = await this.clientDesafios.send('consultar-desafios', { idJogador: '', _id: _id }).toPromise()

        this.logger.log(`desafio: ${JSON.stringify(desafio)}`)
            
        /*
            Verificamos se o desafio está cadastrado
        */
        if (!desafio) {

            throw new BadRequestException(`Desafio não cadastrado!`)

        }

           await this.clientDesafios.emit('deletar-desafio', desafio )
    
        }

}
