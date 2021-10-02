import {
  HttpStatus,
  Injectable,
  CanActivate,
  HttpException,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { GqlExecutionContext } from '@nestjs/graphql'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AppGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context).getContext()

    if (!ctx.headers.authorization) {
      throw new UnauthorizedException(
        'TOKEN_NOT_FOUND',
        'Any token found in context',
      )
    }

    ctx.user = await this.validateToken(ctx.headers.authorization)

    return true
  }

  async validateToken(auth: string): Promise<any> {
    let token = ''

    if (auth.split(' ')[0] === 'Bearer') {
      token = auth.split(' ')[1]
    } else {
      token = auth.split(' ')[0]
    }

    try {
      return this.jwtService.verify(token)
    } catch (error) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED)
    }
  }
}
