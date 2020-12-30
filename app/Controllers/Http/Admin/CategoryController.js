'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Category = use('App/Models/Category')
const Transformer = use('App/Transformers/Admin/CategoryTransformer')

class CategoryController {
  /**
   * Show a list of all categories.
   * GET categories
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {TransformWith} ctx.transform
   * @param {object} ctx.pagination
   */
  async index({ request, response, transform, pagination }) {
    const title = request.input('title')

    const query = Category.query()

    if (title) {
      query.where('title', 'LIKE', `%${title}%`)
    }

    var categories = await query.paginate(pagination.page, pagination.limit)
    categories = await transform.paginate(categories, Transformer)

    return response.json(categories)
  }

  /**
   * Create/save a new category.
   * POST categories
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, transform }) {
    try {
      const { title, description, image_id } = request.all()
      var category = await Category.create({ title, description, image_id })

      category = await transform.item(category, Transformer)

      return response.status(201).json(category)
    } catch (error) {
      return response.status(400).json({
        message: 'Erro ao processar a sua solicitação',
      })
    }
  }

  /**
   * Display a single category.
   * GET categories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params: { id }, request, response, transform }) {
    var category = await Category.findOrFail(id)
    category = await transform.item(category, Transformer)

    return response.json(category)
  }

  /**
   * Update category details.
   * PUT or PATCH categories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params: { id }, request, response, transform }) {
    var category = await Category.findOrFail(id)

    const { title, description, image_id } = request.all()
    category.merge({ title, description, image_id })

    await category.save()
    category = await transform.item(category, Transformer)

    return response.json(category)
  }

  /**
   * Delete a category with id.
   * DELETE categories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params: { id }, request, response }) {
    const category = await Category.findOrFail(id)
    await category.delete()

    return response.status(204).json()
  }
}

module.exports = CategoryController
