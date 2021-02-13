import { Module } from '@nestjs/common';
import { RankingsController } from './rankings.controller';
import { ProxyRMQModule } from '../proxyrmq/proxyrmq.module' 

@Module({
  imports: [ProxyRMQModule],
  controllers: [RankingsController]
})
export class RankingsModule {}
