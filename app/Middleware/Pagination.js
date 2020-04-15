'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class Pagination {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle(ctx, next) {
    if (ctx.request.method() === 'GET') {
      const page = parseInt(ctx.request.input('page'))
      const limit = parseInt(ctx.request.input('limit'))

      // Atribuindo valores para a propriedade pagination
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

module.exports = Pagination
