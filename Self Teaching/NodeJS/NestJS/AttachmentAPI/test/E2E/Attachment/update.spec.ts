import 'start/env'

import * as request from 'supertest'
import { AppModule } from 'app/AppModule'
import { App, Database } from 'test/Utils'
import { payload, createPayload, apiKey, secret } from './constants'
import { AttachmentRepository } from 'app/Repositories/AttachmentRepository'

describe('\n[E2E] Update Attachment 🏘', () => {
  it('should update one attachment', async () => {
    const attachment = await attachmentRepository.storeOne(payload)

    const status = 200
    const method = 'PUT'
    const code = 'RESPONSE'
    const path = `/attachments/${attachment._id}?secret=${secret}`
    const updatePayload = {
      ...createPayload,
      icon: 'icons/fonts/email',
      title: 'Documento CPF',
    }

    const { body } = await request(app.server.getHttpServer())
      .put(path)
      .set('api_key', apiKey)
      .field('icon', updatePayload.icon)
      .field('title', updatePayload.title)
      .expect(status)

    expect(body.code).toBe(code)
    expect(body.path).toBe(path)
    expect(body.method).toBe(method)
    expect(body.status).toBe(status)
    expect(body.data._id).toBe(`${attachment._id}`)
    expect(body.data.icon).toBe(updatePayload.icon)
    expect(body.data.title).toBe(updatePayload.title)
  })

  it('should throw a not valid ObjectId error', async () => {
    const status = 500
    const method = 'PUT'
    const code = 'Error'
    const path = `/attachments/null-id?secret=${secret}`

    const { body } = await request(app.server.getHttpServer())
      .put(path)
      .set('api_key', apiKey)
      .expect(status)

    expect(body.code).toBe(code)
    expect(body.path).toBe(path)
    expect(body.method).toBe(method)
    expect(body.status).toBe(status)
    expect(body.error).toEqual({
      name: 'Error',
      message: 'Internal Server Error',
    })
  })

  it('should throw a not found error', async () => {
    const status = 404
    const method = 'PUT'
    const code = 'Error'
    const path = `/attachments/601d80cf50ee4620e3373371?secret=${secret}`

    const { body } = await request(app.server.getHttpServer())
      .put(path)
      .set('api_key', apiKey)
      .expect(status)

    expect(body.code).toBe(code)
    expect(body.path).toBe(path)
    expect(body.method).toBe(method)
    expect(body.status).toBe(status)
    expect(body.error).toEqual({
      name: 'Error',
      message: {
        error: 'Not Found',
        message: 'NOT_FOUND_ATTACHMENT',
        statusCode: status,
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
