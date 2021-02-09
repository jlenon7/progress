import 'start/env'

import * as request from 'supertest'
import { payload, apiKey, secret } from './constants'
import { AppModule } from 'app/AppModule'
import { App, Database } from 'test/Utils'
import { ContactRepository } from 'app/Repositories/ContactRepository'

describe('\n[E2E] Delete Contact 🏘', () => {
  it('should delete one contact', async () => {
    const contact = await contactRepository.storeOne(payload)

    const status = 200
    const method = 'DELETE'
    const code = 'RESPONSE'
    const path = `/contacts/${contact._id}?secret=${secret}`

    const { body } = await request(app.server.getHttpServer())
      .delete(path)
      .set('api_key', apiKey)
      .expect(status)

    expect(body.code).toBe(code)
    expect(body.path).toBe(path)
    expect(body.method).toBe(method)
    expect(body.status).toBe(status)
    expect(body.data.status).toBe('deleted')
    expect(body.data._id).toBe(`${contact._id}`)
  })

  it('should throw a not valid ObjectId error', async () => {
    const status = 500
    const method = 'DELETE'
    const code = 'Error'
    const path = `/contacts/null-id?secret=${secret}`

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
    const path = `/contacts/601d80cf50ee4620e3373371?secret=${secret}`

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
        message: 'NOT_FOUND_CONTACT',
        statusCode: status,
      },
    })
  })
})

let app: App
let database: Database
let contactRepository: ContactRepository

beforeEach(async () => {
  app = await new App([AppModule]).initApp()
  database = new Database(app)

  contactRepository = database.getRepository(ContactRepository)
})

afterEach(async () => {
  await database.truncate()
  await database.closeConnection()
  await app.closeApp()
})
