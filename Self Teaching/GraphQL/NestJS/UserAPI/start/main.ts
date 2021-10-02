import '../start/env'
import appConfig from '../config/app'
import swagger from '../config/swagger'
import AppModule from '../app/AppModule'
import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  await app.setGlobalPrefix(appConfig.prefix)
  app.useGlobalPipes(new ValidationPipe())

  const document = SwaggerModule.createDocument(app, swagger)
  SwaggerModule.setup(`${appConfig.prefix}/swagger`, app, document)

  await app.listen(appConfig.port)
}

bootstrap().then()
