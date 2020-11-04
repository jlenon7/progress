import appConfig from './app'
import { DocumentBuilder } from '@nestjs/swagger'

export default new DocumentBuilder()
  .setTitle(appConfig.name)
  .setDescription(appConfig.description)
  .setVersion(appConfig.version)
  .addBearerAuth()
  .build()
