import { Module } from '@nestjs/common'
import { JogadoresController } from './jogadores.controller'
import { ProxyRMQModule } from '../proxyrmq/proxyrmq.module'
import { MulterModule } from '@nestjs/platform-express'

@Module({
  imports: [ProxyRMQModule, MulterModule.register({ dest: 'tmp/upload' })],
  controllers: [JogadoresController],
})
export class JogadoresModule {}
