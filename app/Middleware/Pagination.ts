import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Pagination {
  public async handle(ctx: HttpContextContract, next: () => Promise<void>) {
    if (ctx.request.method() === 'GET') {
      const page = ctx.request.input('page') ? parseInt(ctx.request.input('page')) : 1
      const limit = ctx.request.input('limit') ? parseInt(ctx.request.input('limit')) : 20

      ctx.pagination = {
        page,
        limit,
      }

      const perpage = parseInt(ctx.request.input('perpage'))

      if (perpage) {
        ctx.pagination.limit = perpage
      }
    }

    await next()
  }
}
