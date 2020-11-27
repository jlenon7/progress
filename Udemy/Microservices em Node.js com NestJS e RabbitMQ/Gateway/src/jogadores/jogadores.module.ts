import { Module } from '@nestjs/common'
import { JogadoresController } from './jogadores.controller'
import { ProxyRMQModule } from '../proxyrmq/proxyrmq.module'

@Module({
  imports: [ProxyRMQModule],
  controllers: [JogadoresController],
})
export class JogadoresModule {}
