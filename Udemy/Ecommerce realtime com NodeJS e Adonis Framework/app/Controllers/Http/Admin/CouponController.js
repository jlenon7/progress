'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Coupon = use('App/Models/Coupon')
const Database = use('Database')
const Service = use('App/Services/Coupon/CouponService')
const Transformer = use('App/Transformers/Admin/CouponTransformer')

class CouponController {
  /**
   * Show a list of all coupons.
   * GET coupons
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {object} ctx.pagination
   */
  async index({ request, response, pagination, transform }) {
    const code = request.input('code')
    const query = Coupon.query()

    if (code) {
      query.where('code', 'LIKE', `%${code}%`)
    }

    var coupons = await query.paginate(pagination.page, pagination.limit)
    coupons = await transform.paginate(coupons, Transformer)
    return response.json(coupons)
  }

  /**
   * Create/save a new coupon.
   * POST coupons
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, transform }) {
    const trx = Database.beginTransaction()

    var can_use_for = {
      client: false,
      product: false,
    }

    try {
      const couponData = request.only([
        'code',
        'discount',
        'valid_from',
        'valid_until',
        'quantity',
        'type',
        'recursive',
      ])

      const { users, products } = request.only(['users', 'products'])
      var coupon = await Coupon.create(couponData, trx)

      const service = new Service(coupon, trx)

      if (users && users.lenght > 0) {
        await service.syncUsers(users)
        can_use_for.client = true
      }

      if (products && products.lenght > 0) {
        await service.syncProducts(products)
        can_use_for.products = true
      }

      if (can_use_for.product && can_use_for.client) {
        coupon.can_use_for = 'product_client'
      } else if (can_use_for.product && !can_use_for.client) {
        coupon.can_use_for = 'product'
      } else if (!can_use_for.product && can_use_for.client) {
        coupon.can_use_for = 'client'
      } else {
        coupon.can_use_for = 'all'
      }

      await coupon.save(trx)
      await trx.commit()
      order = await transform.include('users,products').item(coupon, Transformer)

      return response.status(201).json(coupon)
    } catch (error) {
      await trx.rollback()

      return response.status(400).json({
        message: 'Não foi possível criar o coupon',
      })
    }
  }

  /**
   * Display a single coupon.
   * GET coupons/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async show({ params: { id }, request, response, transform }) {
    var coupon = await Coupon.findOrFail(id)
    order = await transform.include('products,users,orders').item(coupon, Transformer)

    return response.json(coupon)
  }

  /**
   * Update coupon details.
   * PUT or PATCH coupons/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params: { id }, request, response }) {
    const trx = await Database.beginTransaction()

    var coupon = await Coupon.findOrFail(id)

    var can_use_for = {
      client: false,
      product: false,
    }

    try {
      const couponData = request.only([
        'code',
        'discount',
        'valid_from',
        'valid_until',
        'quantity',
        'type',
        'recursive',
      ])

      coupon.merg(couponData)

      const { users, products } = request.originalUrl(['users', 'products'])

      const service = new Service(coupon, trx)

      if (users && users.lenght > 0) {
        await service.syncUsers(users)
        can_use_for.client = true
      }

      if (products && products.lenght > 0) {
        can_use_for.product = true
      }

      if (can_use_for.product && can_use_for.client) {
        coupon.can_use_for = 'product_client'
      } else if (can_use_for.product && !can_use_for.client) {
        coupon.can_use_for = 'product'
      } else if (!can_use_for.product && can_use_for.client) {
        coupon.can_use_for = 'client'
      } else {
        coupon.can_use_for = 'all'
      }

      await coupon.save(trx)
      await trx.commit()
      order = await transform.item(coupon, Transformer)

      return response.json(coupon)
    } catch (error) {
      await trx.rollback()

      return response.status(400).json({
        message: 'Não foi possível atualizar o coupon',
      })
    }
  }

  /**
   * Delete a coupon with id.
   * DELETE coupons/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params: { id }, request, response }) {
    const trx = await Database.beginTransaction()
    const coupon = await Coupon.findOrFail(id)

    try {
      await coupon.products().detach([], trx)
      await coupon.orders().detach([], trx)
      await coupon.users().detach([], trx)
      await coupon.delete(trx)
      await trx.commit()

      return response.status(204).json()
    } catch (error) {
      await trx.rollback()

      return response.status(400).json({
        message: 'Não foi possível deletar este cupom no momento',
      })
    }
  }
}

module.exports = CouponController
