import axios from 'axios'

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'

@Injectable()
export default class AppGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const apiKey = request.headers.api_key
    const secret = request.query.secret

    const { data } = await axios.get(
      `https://secjs-application.herokuapp.com/app/applications/me?secret=${secret}`,
      {
        headers: { api_key: apiKey },
      },
    )

    const application = data.data

    if (!application) {
      return false
    }

    request.application = application

    return true
  }
}
