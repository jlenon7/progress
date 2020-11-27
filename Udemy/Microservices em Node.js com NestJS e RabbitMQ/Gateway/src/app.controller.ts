import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices'
import {
  Controller,
  Post,
  ValidationPipe,
  Body,
  UsePipes,
  Query,
  Get,
} from '@nestjs/common'
import { CriarCategoriaDto } from './dtos/criar-categoria.dto'
import { Observable } from 'rxjs'

@Controller('api/v1')
export class AppController {
  private clientAdminBackend: ClientProxy

  constructor() {
    this.clientAdminBackend = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [
          'amqp://rfwsurug:5QzatDz5SCjTSNzP4FnfLTjTzBzVdK8m@jaguar.rmq.cloudamqp.com:5672/rfwsurug',
        ],
        queue: 'admin-backend',
      },
    })
  }

  @Get('categorias')
  public getCategorias(@Query('id') id: string): Observable<any> {
    return this.clientAdminBackend.send('consultar-categorias', id || '')
  }

  @Post('categorias')
  @UsePipes(ValidationPipe)
  public setCategoria(@Body() categoriaDto: CriarCategoriaDto) {
    this.clientAdminBackend.emit('criar-categoria', categoriaDto)
  }
}
