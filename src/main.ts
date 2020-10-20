import AppModule from './app/app.module'
import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(new ValidationPipe())

  await app.listen(3333)
}

bootstrap().then()
