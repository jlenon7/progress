import { Injectable, NestMiddleware } from '@nestjs/common'

@Injectable()
export default class PaginationMiddleware implements NestMiddleware {
  use(req, res, next) {
    const page = req.query.page ? parseInt(req.query.page) : 0
    const limit = req.query.limit ? parseInt(req.query.limit) : 10

    req.pagination = {
      page,
      limit,
    }

    next()
  }
}
