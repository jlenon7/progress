import { Controller, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import { Desafio } from './interfaces/desafio.interface'
import { EventPattern, Payload, Ctx, RmqContext } from '@nestjs/microservices';

const ackErrors: string[] = ['E11000']

@Controller()
export class AppController {
  
  constructor(private readonly appService: AppService) {}

  private readonly logger = new Logger(AppController.name)

  @EventPattern('notificacao-novo-desafio')
  async enviarEmailAdversario(
    @Payload() desafio: Desafio, 
    @Ctx() context: RmqContext
    ): Promise<void> {
      const channel = context.getChannelRef()
      const originalMsg = context.getMessage()
      try {
          this.logger.log(`desafio: ${JSON.stringify(desafio)}`)
          await this.appService.enviarEmailParaAdversario(desafio)
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