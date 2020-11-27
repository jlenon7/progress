import { Controller, Get, Logger } from '@nestjs/common'
import {
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices'
import { AppService } from './app.service'
import { ICategoria } from './interfaces/categorias/categoria.interface'

@Controller()
export class AppController {
  private ackErrors = ['E11000']
  constructor(private readonly appService: AppService) {}

  @MessagePattern('consultar-categorias')
  public async getCategorias(@Ctx() ctx: RmqContext, @Payload() id: string) {
    const channel = ctx.getChannelRef()
    const originalMsg = ctx.getMessage()

    try {
      if (id) {
        return this.appService.getCategoria(id)
      }

      return this.appService.getCategorias()
    } finally {
      await channel.ack(originalMsg)
    }
  }

  @EventPattern('criar-categoria')
  public async storeCategoria(
    @Ctx() ctx: RmqContext,
    @Payload() categoria: ICategoria,
  ) {
    const channel = ctx.getChannelRef()
    const originalMsg = ctx.getMessage()

    try {
      await this.appService.storeCategoria(categoria)

      await channel.ack(originalMsg)
    } catch (error) {
      if (this.ackErrors.filter(ackError => error.message.includes(ackError))) {
        await channel.ack(originalMsg)
      }
    }
  }

  @EventPattern('atualizar-categoria')
  public async updateCategoria(@Ctx() ctx: RmqContext, @Payload() data: any) {
    const channel = ctx.getChannelRef()
    const originalMsg = ctx.getMessage()

    try {
      await this.appService.updateCategoria(data.id, data.categoria)

      await channel.ack(originalMsg)
    } catch (error) {
      if (this.ackErrors.filter(ackError => error.message.includes(ackError))) {
        await channel.ack(originalMsg)
      }
    }
  }
}
