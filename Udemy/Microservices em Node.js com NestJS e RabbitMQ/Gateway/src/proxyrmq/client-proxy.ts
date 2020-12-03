import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ClientProxySmartRanking {
  getClientProxyAdminBackendInstance(): ClientProxy {
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [
          'amqp://rfwsurug:5QzatDz5SCjTSNzP4FnfLTjTzBzVdK8m@jaguar.rmq.cloudamqp.com:5672/rfwsurug',
        ],
        queue: 'admin-backend',
      },
    })
  }
}
