import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices'
import {
  Controller,
  Post,
  Logger,
  ValidationPipe,
  Body,
  UsePipes,
} from '@nestjs/common'
import { CriarCategoriaDto } from './dtos/criar-categoria.dto'

@Controller('api/v1')
export class AppController {
  private logger = new Logger(AppController.name)
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

  @Post('categorias')
  @UsePipes(ValidationPipe)
  async criarCategoria(@Body() categoriaDto: CriarCategoriaDto) {
    return this.clientAdminBackend.emit('criar-categoria', categoriaDto)
  }
}
