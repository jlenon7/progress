import { Controller, Get, Logger } from '@nestjs/common'
import {
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices'
import { CategoriasService } from './categorias.service'
import { ICategoria } from './interfaces/categoria.interface'

@Controller()
export class CategoriasController {
  private ackErrors = ['E11000']
  constructor(private readonly categoriasService: CategoriasService) {}

  @MessagePattern('consultar-categorias')
  public async getCategorias(@Ctx() ctx: RmqContext, @Payload() id: string) {
    const channel = ctx.getChannelRef()
    const originalMsg = ctx.getMessage()

    try {
      if (id) {
        return this.categoriasService.getCategoria(id)
      }

      return this.categoriasService.getCategorias()
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
      await this.categoriasService.storeCategoria(categoria)

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
      await this.categoriasService.updateCategoria(data.id, data.categoria)

      await channel.ack(originalMsg)
    } catch (error) {
      if (this.ackErrors.filter(ackError => error.message.includes(ackError))) {
        await channel.ack(originalMsg)
      }
    }
  }
}
