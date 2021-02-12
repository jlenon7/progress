import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const Application = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest()
    return request.application
  },
)
