import kernel from 'start/kernel'
import services from 'app/Services/kernel'
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
  providers: [...guards, ...services, ...repositories, ...collections],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    middlewares.forEach(middleware => {
      consumer.apply(middleware.middleware).forRoutes(...middleware.routes)
    })
  }
}
