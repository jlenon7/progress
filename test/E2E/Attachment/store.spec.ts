import 'start/env'

import * as request from 'supertest'
import { AppModule } from 'app/AppModule'
import { App, Database } from 'test/Utils'
import { createPayload, secret, apiKey } from './constants'
import { AttachmentRepository } from 'app/Repositories/AttachmentRepository'

describe('\n[E2E] Store Attachment 🏘', () => {
  it('should store one attachment', async () => {
    const status = 201
    const method = 'POST'
    const code = 'RESPONSE'
    const path = `/attachments?secret=${secret}`

    const { body } = await request(app.server.getHttpServer())
      .post(path)
      .set('api_key', apiKey)
      .field('type', createPayload.type)
      .field('icon', createPayload.icon)
      .field('title', createPayload.title)
      .field('ownerId', createPayload.ownerId)
      .field('document.number', createPayload.document.number)
      .field('document.emission', createPayload.document.emission)
      .field('document.expirationDate', createPayload.document.expirationDate)
      .expect(status)

    const attachment = await attachmentRepository.getOne(null, {
      where: [{ key: 'ownerId', value: createPayload.ownerId }],
    })

    expect(body.code).toBe(code)
    expect(body.path).toBe(path)
    expect(body.method).toBe(method)
    expect(body.status).toBe(status)
    expect(attachment.title).toBe(createPayload.title)
    expect(body.data.ownerId).toBe(createPayload.ownerId)
  })

  it('should throw a validation error when does not send ownerId and attachment type', async () => {
    const status = 400
    const method = 'POST'
    const code = 'Error'
    const path = `/attachments?secret=${secret}`

    const { body } = await request(app.server.getHttpServer())
      .post(path)
      .set('api_key', apiKey)
      .expect(status)

    expect(body.code).toBe(code)
    expect(body.path).toBe(path)
    expect(body.method).toBe(method)
    expect(body.status).toBe(status)
    expect(body.error).toEqual({
      name: 'Error',
      message: {
        statusCode: status,
        message: [
          'ownerId should not be empty',
          'ownerId must be a string',
          'type must be one of the following values: avatar,rg,cnh,cpf,id,proof_of_address,mock',
          'type should not be empty',
          'type must be a string',
        ],
        error: 'Bad Request',
      },
    })
  })
})

let app: App
let database: Database
let attachmentRepository: AttachmentRepository

beforeEach(async () => {
  app = await new App([AppModule]).initApp()
  database = new Database(app)

  attachmentRepository = database.getRepository(AttachmentRepository)
})

afterEach(async () => {
  await database.truncate()
  await database.closeConnection()
  await app.closeApp()
})
