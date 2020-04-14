'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Product = use('App/Models/Product')

class ProductController {
  /**
   * Show a list of all products.
   * GET products
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {object} ctx.pagination
   */
  async index({ request, response, pagination }) {
    const name = request.input('name')
    const query = Product.query()

    if (name) {
      query.where('name', 'LIKE', `%${name}%`)
    }

    const products = await query.paginate(pagination.page, pagination.limit)

    return response.json(products)
  }

  /**
   * Create/save a new product.
   * POST products
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    try {
      const { name, description, price, image_id } = request.all()

      const product = await Product.create({
        name,
        description,
        price,
        image_id,
      })

      return response.status(201).json(product)
    } catch (error) {
      return response.status(400).json({
        message: 'Não foi possivel criar o produto neste momento',
      })
    }
  }

  /**
   * Display a single product.
   * GET products/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params: { id }, request, response }) {
    const product = await Product.findOrFail(id)

    return response.json(product)
  }

  /**
   * Update product details.
   * PUT or PATCH products/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params: { id }, request, response }) {
    const product = await Product.findOrFail(id)

    try {
      const { name, description, price, image_id } = request.all()
      product.merge({ name, description, price, image_id })

      await product.save()

      return response.json(product)
    } catch (error) {
      return response.status(400).json({
        message: 'Não foi possível atualizar este produto',
      })
    }
  }

  /**
   * Delete a product with id.
   * DELETE products/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params: { id }, request, response }) {
    const product = await Product.findOrFail(id)

    try {
      await product.delete()

      return response.status(204).json()
    } catch (error) {
      return response.status(500).json({
        message: 'Não foi possível deletar este produto',
      })
    }
  }
}

module.exports = ProductController
