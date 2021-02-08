import kernel from 'start/kernel'
import services from 'app/Services/kernel'
import repositories from 'app/Repositories/kernel'

import { Module } from '@nestjs/common'
import { httpControllers, collections, guards } from 'app/Controllers/kernel'

@Module({
  imports: [...kernel],
  controllers: [...httpControllers],
  providers: [...guards, ...services, ...repositories, ...collections],
})
export class AppModule {}
