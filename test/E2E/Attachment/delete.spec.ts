import 'start/env'

import * as request from 'supertest'
import { payload, apiKey, secret } from './constants'
import { AppModule } from 'app/AppModule'
import { App, Database } from 'test/Utils'
import { AttachmentRepository } from 'app/Repositories/AttachmentRepository'

describe('\n[E2E] Delete Attachment 🏘', () => {
  it('should delete one attachment', async () => {
    const attachment = await attachmentRepository.storeOne(payload)

    const status = 200
    const method = 'DELETE'
    const code = 'RESPONSE'
    const path = `/attachments/${attachment._id}?secret=${secret}`

    const { body } = await request(app.server.getHttpServer())
      .delete(path)
      .set('api_key', apiKey)
      .expect(status)

    expect(body.code).toBe(code)
    expect(body.path).toBe(path)
    expect(body.method).toBe(method)
    expect(body.status).toBe(status)
    expect(body.data.status).toBe('deleted')
    expect(body.data._id).toBe(`${attachment._id}`)
  })

  it('should throw a not valid ObjectId error', async () => {
    const status = 500
    const method = 'DELETE'
    const code = 'Error'
    const path = `/attachments/null-id?secret=${secret}`

    const { body } = await request(app.server.getHttpServer())
      .delete(path)
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
    const method = 'DELETE'
    const code = 'Error'
    const path = `/attachments/601d80cf50ee4620e3373371?secret=${secret}`

    const { body } = await request(app.server.getHttpServer())
      .delete(path)
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
