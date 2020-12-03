import { AppModule } from './app.module'
import { NestFactory } from '@nestjs/core'
import * as momentTimezone from 'moment-timezone'
import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor'
import { AllExceptionsFilter } from './common/filters/http-exception.filter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalFilters(new AllExceptionsFilter())
  app.useGlobalInterceptors(new TimeoutInterceptor())

  // eslint-disable-next-line no-extend-native
  Date.prototype.toJSON = () => {
    return momentTimezone(this)
      .tz('America/Sao_Paulo')
      .format('YYYY-MM-DD HH:mm:ss.SSS')
  }

  await app.listen(4000)
}
bootstrap()
