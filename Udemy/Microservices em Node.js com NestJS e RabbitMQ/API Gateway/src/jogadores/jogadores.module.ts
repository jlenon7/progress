import { Module } from '@nestjs/common';
import { JogadoresController } from './jogadores.controller';
import { ProxyRMQModule } from '../proxyrmq/proxyrmq.module'
import { AwsModule } from '../aws/aws.module'

@Module({
  imports: [ProxyRMQModule, AwsModule],  
  controllers: [JogadoresController]
})
export class JogadoresModule {}
