import kernel from 'start/kernel'
import services from 'app/Services/kernel'
import providers from 'app/Providers/kernel'
import repositories from 'app/Repositories/kernel'

import {
  guards,
  middlewares,
  collections,
  httpControllers,
} from 'app/Controllers/kernel'
import { MiddlewareConsumer, Module } from '@nestjs/common'

@Module({
  imports: [...kernel],
  controllers: [...httpControllers],
  providers: [
    ...guards,
    ...services,
    ...providers,
    ...collections,
    ...repositories,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    middlewares.forEach(middleware => {
      consumer.apply(middleware.middleware).forRoutes(...middleware.routes)
    })
  }
}
