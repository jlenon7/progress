import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { Request } from 'express'

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, any> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp()
    const request = ctx.getRequest<Request>()

    return next.handle().pipe(
      map(data => ({
        code: 'RESPONSE',
        path: request.url,
        method: request.method,
        status: context.switchToHttp().getResponse().statusCode,
        data,
      })),
    )
  }
}
