import { Module } from '@nestjs/common';
import { ClientProxySmartRanking } from './client-proxy'

@Module({
    providers: [ClientProxySmartRanking],
    exports: [ClientProxySmartRanking]
})
export class ProxyRMQModule {}
