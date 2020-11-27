import { Controller, Logger } from '@nestjs/common'
import { JogadoresService } from './jogadores.service'
import {
  EventPattern,
  Payload,
  Ctx,
  RmqContext,
  MessagePattern,
} from '@nestjs/microservices'
import { IJogador } from './interfaces/jogador.interface'

@Controller()
export class JogadoresController {
  private ackErrors = ['E11000']
  constructor(private readonly jogadoresService: JogadoresService) {}

  @EventPattern('criar-jogador')
  async store(@Payload() jogador: IJogador, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef()
    const originalMsg = context.getMessage()

    try {
      await this.jogadoresService.storeJogador(jogador)

      await channel.ack(originalMsg)
    } catch (error) {
      if (this.ackErrors.filter(ackError => error.message.includes(ackError))) {
        await channel.ack(originalMsg)
      }
    }
  }

  @MessagePattern('consultar-jogadores')
  async getJogadores(@Payload() id: string, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef()
    const originalMsg = context.getMessage()

    try {
      if (id) {
        return this.jogadoresService.getJogador(id)
      } else {
        return this.jogadoresService.getJogadores()
      }
    } finally {
      await channel.ack(originalMsg)
    }
  }

  @EventPattern('atualizar-jogador')
  async update(@Payload() data: any, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef()
    const originalMsg = context.getMessage()

    try {
      await this.jogadoresService.updateJogador(data.id, data.jogador)

      await channel.ack(originalMsg)
    } catch (error) {
      if (this.ackErrors.filter(ackError => error.message.includes(ackError))) {
        await channel.ack(originalMsg)
      }
    }
  }

  @EventPattern('deletar-jogador')
  async delete(@Payload() id: string, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef()
    const originalMsg = context.getMessage()

    try {
      await this.jogadoresService.deleteJogador(id)

      await channel.ack(originalMsg)
    } catch (error) {
      if (this.ackErrors.filter(ackError => error.message.includes(ackError))) {
        await channel.ack(originalMsg)
      }
    }
  }
}
