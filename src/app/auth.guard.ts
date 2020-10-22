import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common'
import * as jwt from 'jsonwebtoken'
import { ConfigService } from '@nestjs/config'
import { GqlExecutionContext } from '@nestjs/graphql'

@Injectable()
export default class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context).getContext()

    if (!ctx.headers.authorization) {
      return false
    }

    ctx.user = await this.validateToken(ctx.headers.authorization)

    return true
  }

  async validateToken(auth: string): Promise<any> {
    const configService = new ConfigService()
    if (auth.split(' ')[0] !== 'Bearer') {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED)
    }

    const token = auth.split(' ')[1]

    try {
      return await jwt.verify(token, configService.get<string>('APP_KEY'))
    } catch (error) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED)
    }
  }
}
