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
  Put,
  Param,
} from '@nestjs/common'
import { CriarCategoriaDto } from './dtos/criar-categoria.dto'
import { Observable } from 'rxjs'
import { AtualizarCategoriaDto } from './dtos/atualizar-categoria.dto'

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
  public storeCategoria(@Body() categoriaDto: CriarCategoriaDto) {
    return this.clientAdminBackend.emit('criar-categoria', categoriaDto)
  }

  @Put('categorias/:id')
  @UsePipes(ValidationPipe)
  public updateCategoria(
    @Body() categoriaDto: AtualizarCategoriaDto,
    @Param('id') id: string,
  ) {
    return this.clientAdminBackend.emit('atualizar-categoria', {
      id,
      categoria: categoriaDto,
    })
  }
}
