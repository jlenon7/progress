import { Controller, Get, Logger } from '@nestjs/common'
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices'
import { AppService } from './app.service'
import { ICategoria } from './interfaces/categorias/categoria.interface'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('criar-categoria')
  public async setCategoria(@Payload() categoria: ICategoria) {
    return this.appService.setCategoria(categoria)
  }

  @MessagePattern('consultar-categorias')
  public async getCategorias(@Payload() id: string) {
    if (id) {
      return this.appService.getCategoria(id)
    }

    return this.appService.getCategorias()
  }
}
