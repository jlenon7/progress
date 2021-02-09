import {
  Catch,
  HttpStatus,
  ArgumentsHost,
  HttpException,
  ExceptionFilter,
  Logger,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Request, Response } from 'express'

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private logger = new Logger(HttpExceptionFilter.name)

  constructor(private configService: ConfigService) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()

    let status = 500
    let message = {} || ''
    const env = this.configService.get('app.enviroment')

    status = exception.getStatus
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR

    message = exception.getResponse
      ? exception.getResponse()
      : 'Internal Server Error'

    if (['development', 'production'].includes(env)) {
      this.logger.error({
        code: exception.name,
        path: request.url,
        method: request.method,
        status: status,
        timestamp: new Date().toISOString(),
        error: exception,
      })
    }

    if (env === 'production' && !exception.getResponse) {
      status = 500
      message = 'Internal Server Error'
    }

    return response.status(status).json({
      code: exception.name,
      path: request.url,
      method: request.method,
      status: status,
      timestamp: new Date().toISOString(),
      error: {
        name: exception.name,
        message: message,
      },
    })
  }
}
