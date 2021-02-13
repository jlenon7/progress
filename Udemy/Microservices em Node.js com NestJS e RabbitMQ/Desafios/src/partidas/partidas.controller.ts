import { Controller, Logger } from '@nestjs/common';
import { PartidasService } from './partidas.service'
import { EventPattern, Payload, Ctx, RmqContext } from '@nestjs/microservices';
import { Partida } from './interfaces/partida.interface'

const ackErrors: string[] = ['E11000']

@Controller()
export class PartidasController {

    constructor(private readonly partidasService: PartidasService){}

    private readonly logger = new Logger(PartidasController.name)

    @EventPattern('criar-partida')
    async criarPartida(
        @Payload() partida: Partida, 
        @Ctx() context: RmqContext
        ) {
        const channel = context.getChannelRef()
        const originalMsg = context.getMessage()
        try {
            this.logger.log(`partida: ${JSON.stringify(partida)}`)
            await this.partidasService.criarPartida(partida)
            await channel.ack(originalMsg)
        } catch(error) {
            this.logger.log(`error: ${JSON.stringify(error.message)}`)
            const filterAckError = ackErrors.filter(
                ackError => error.message.includes(ackError))
              if (filterAckError.length > 0) {
                await channel.ack(originalMsg)
              }
        }
    }
}