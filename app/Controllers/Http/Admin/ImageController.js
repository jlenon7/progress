'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Image = use('App/Models/Image')
const { manage_single_upload, manage_multiple_uploads } = use('App/Helpers')
const fs = use('fs')

class ImageController {
  /**
   * Show a list of all images.
   * GET images
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {object} ctx.pagination
   */
  async index({ request, response, pagination }) {
    const images = await Image.query()
      .orderBy('id', 'DESC')
      .paginate(pagination.page, pagination.limit)

    return response.json(images)
  }

  /**
   * Create/save a new image.
   * POST images
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    try {
      const fileJar = request.file('images', {
        types: ['image'],
        size: '2mb',
      })

      let images = []
      if (!fileJar.files) {
        const file = await manage_single_upload(fileJar)

        if (file.moved()) {
          const image = await Image.create({
            path: file.fileName,
            size: file.size,
            original_name: file.clientName,
            extension: file.subtype,
          })

          images.push(image)

          return response.status(201).json({
            successes: images,
            errors: {},
          })
        }

        return response.status(400).json({
          message: 'Não foi possível processar o upload da imagem',
        })
      }

      let files = await manage_multiple_uploads(fileJar)

      await Promise.all(
        files.successes.map(async file => {
          const image = await Image.create({
            path: file.fileName,
            size: file.size,
            original_name: file.clientName,
            extension: file.subtype,
          })
          images.push(image)
        })
      )

      return response
        .status(201)
        .json({ successes: images, errors: files.errors })
    } catch (error) {
      return response.status(400).json({
        message: 'Não foi possível processar a sua solicitação',
      })
    }
  }

  /**
   * Display a single image.
   * GET images/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params: { id }, request, response, view }) {
    const image = await Image.findOrFail()

    return response.json(image)
  }

  /**
   * Update image details.
   * PUT or PATCH images/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params: { id }, request, response }) {
    const image = await Image.findOrFail(id)

    try {
      image.merge(request.only(['original_name']))
      await image.save()

      response.status(200).json(image)
    } catch (error) {
      response.status(400).json({
        message: 'Não foi possível atualizar esta imagem no momento',
      })
    }
  }

  /**
   * Delete a image with id.
   * DELETE images/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params: { id }, request, response }) {
    const image = Image.findOrFail(id)

    try {
      let filepath = Helpers.publicPath(`uploads/${image.path}`)

      await fs.unlink(filepath, err => {
        if(!err)
        await image.delete()
      })

      return response.status(204).json()
    } catch (error) {
      return response.status(400).json({
        message: 'Não foi possível deletar a imagem no momento'
      })
    }
  }
}

module.exports = ImageController
