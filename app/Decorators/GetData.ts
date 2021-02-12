import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const GetData = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest()

    if (!Object.keys(request.body).length) {
      return {
        where: [],
        orderBy: [],
        includes: [],
      }
    }

    return request.body
  },
)
