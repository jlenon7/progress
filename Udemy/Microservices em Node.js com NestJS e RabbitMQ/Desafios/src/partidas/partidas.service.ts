import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Partida } from './interfaces/partida.interface'
import { Desafio } from '../desafios/interfaces/desafio.interface'
import { RpcException } from '@nestjs/microservices';
import { ClientProxySmartRanking } from '../proxyrmq/client-proxy'

@Injectable()
export class PartidasService {

    constructor(
        @InjectModel('Partida') private readonly partidaModel: Model<Partida>,
        private clientProxySmartRanking: ClientProxySmartRanking
       ) {}

    private readonly logger = new Logger(PartidasService.name)

    private clientDesafios = 
        this.clientProxySmartRanking.getClientProxyDesafiosInstance()

    private clientRankings =
        this.clientProxySmartRanking.getClientProxyRankingsInstance()

    async criarPartida(partida: Partida): Promise<Partida> {
        try {
            /*
                Iremos persistir a partida e logo em seguida atualizaremos o
                desafio. O desafio irá receber o ID da partida e seu status
                será modificado para REALIZADO.
            */
            const partidaCriada = new this.partidaModel(partida)
            this.logger.log(`partidaCriada: ${JSON.stringify(partidaCriada)}`)
            /*
                Recuperamos o ID da partida
            */
            const result = await partidaCriada.save()
            this.logger.log(`result: ${JSON.stringify(result)}`)
            const idPartida = result._id
            /*
                Com o ID do desafio que recebemos na requisição, recuperamos o 
                desafio.
            */     
            const desafio: Desafio = await this.clientDesafios
                                        .send('consultar-desafios', 
                                        { idJogador: '', _id: partida.desafio })
                                        .toPromise()
            /*
                Acionamos o tópico 'atualizar-desafio-partida' que será
                responsável por atualizar o desafio.
            */
            await this.clientDesafios
                                    .emit('atualizar-desafio-partida', 
                                    { idPartida: idPartida, desafio: desafio })
                                    .toPromise()

            /*
                Enviamos a partida para o microservice rankings,
                indicando a necessidade de processamento desta partida
            */
            return await this.clientRankings.emit('processar-partida', 
            {idPartida: idPartida, partida: partida}).toPromise()


            
        } catch (error) {
            this.logger.error(`error: ${JSON.stringify(error.message)}`)
            throw new RpcException(error.message)
        }

    }
}
