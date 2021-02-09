import 'start/env'

import { NestFactory } from '@nestjs/core'
import { AppModule } from 'app/AppModule'
import { ConfigService } from '@nestjs/config'
import { HttpExceptionFilter } from 'app/Controllers/Http/Filters/HttpExceptionFilter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const Config = app.get(ConfigService)

  app.enableCors(Config.get('cors'))
  app.setGlobalPrefix(Config.get('app.prefix'))
  app.useGlobalFilters(new HttpExceptionFilter(Config))

  await app.listen(Config.get('app.port'))
}

bootstrap().catch()
