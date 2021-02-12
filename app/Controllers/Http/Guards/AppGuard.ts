import axios from 'axios'

import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export default class AppGuard implements CanActivate {
  @Inject(ConfigService) private configService: ConfigService

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const apiKey = request.headers.api_key
    const secret = request.query.secret
    const url = `${this.configService.get('app.services.application.url')}`

    const { data } = await axios.get(`${url}?secret=${secret}`, {
      headers: { api_key: apiKey },
    })

    const application = data.data

    if (!application) {
      return false
    }

    request.application = application

    return true
  }
}
