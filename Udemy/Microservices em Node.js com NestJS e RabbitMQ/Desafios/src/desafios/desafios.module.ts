import { Module } from '@nestjs/common';
import { DesafiosService } from './desafios.service';
import { DesafiosController } from './desafios.controller';
import { MongooseModule } from '@nestjs/mongoose'
import { DesafioSchema } from './interfaces/desafio.schema'
import { ProxyRMQModule } from '../proxyrmq/proxyrmq.module'

@Module({
  imports: [MongooseModule.forFeature([
    { name: 'Desafio', schema: DesafioSchema }
  ]),
  ProxyRMQModule
],
  providers: [DesafiosService],
  controllers: [DesafiosController]
})
export class DesafiosModule {}
