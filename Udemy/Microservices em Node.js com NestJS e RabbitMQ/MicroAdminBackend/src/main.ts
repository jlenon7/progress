import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { Transport } from '@nestjs/microservices'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [
        'amqp://rfwsurug:5QzatDz5SCjTSNzP4FnfLTjTzBzVdK8m@jaguar.rmq.cloudamqp.com:5672/rfwsurug',
      ],
      noAck: false,
      queue: 'admin-backend',
    },
  })

  await app.listen(() =>
    new Logger('NestMicroservice').log('Gateway is now listening for requests'),
  )
}
bootstrap()
