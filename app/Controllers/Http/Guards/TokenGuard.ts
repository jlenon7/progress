import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
  UnauthorizedException,
} from '@nestjs/common'
import { TokenRepository } from 'app/Repositories/TokenRepository'

@Injectable()
export default class TokenGuard implements CanActivate {
  @Inject(TokenRepository) private tokenRepository: TokenRepository

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const apiKey = request.headers.api_key
    const secret = request.query.secret

    const tokenApi = await this.tokenRepository.getOne(null, {
      where: [{ key: 'value', value: apiKey }],
      includes: [{ relation: 'application' }],
    })

    if (!tokenApi) {
      throw new UnauthorizedException('TOKEN_INVALID')
    }

    const tokenSecret = await this.tokenRepository.getOne(null, {
      where: [{ key: 'value', value: secret }],
    })

    if (!tokenSecret) {
      throw new UnauthorizedException('TOKEN_INVALID')
    }

    if (tokenApi.token !== tokenSecret.token) {
      throw new UnauthorizedException('TOKEN_INVALID')
    }

    const application = tokenApi.application

    if (!application) {
      return false
    }

    request.application = application

    return true
  }
}
