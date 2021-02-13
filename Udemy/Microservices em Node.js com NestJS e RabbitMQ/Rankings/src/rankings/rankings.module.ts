import { Module } from '@nestjs/common';
import { RankingsService } from './rankings.service';
import { RankingsController } from './rankings.controller';
import { RankingSchema } from './interfaces/ranking.schema'
import { MongooseModule } from '@nestjs/mongoose'
import { ProxyRMQModule } from '../proxyrmq/proxyrmq.module'

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'Ranking', schema: RankingSchema}
  ]), ProxyRMQModule
],
  providers: [RankingsService],
  controllers: [RankingsController]
})
export class RankingsModule {}
