import 'start/env'

import * as request from 'supertest'
import { AppModule } from 'app/AppModule'
import { App, Database } from 'test/Utils'
import { createPayload, secret, apiKey } from './constants'
import { ContactRepository } from 'app/Repositories/ContactRepository'

describe('\n[E2E] Store Contact 🏘', () => {
  it('should store one contact', async () => {
    const status = 201
    const method = 'POST'
    const code = 'RESPONSE'
    const path = `/contacts?secret=${secret}`

    const { body } = await request(app.server.getHttpServer())
      .post(path)
      .set('api_key', apiKey)
      .send(createPayload)
      .expect(status)

    const contact = await contactRepository.getOne(null, {
      where: [{ key: 'ownerId', value: createPayload.ownerId }],
    })

    expect(body.code).toBe(code)
    expect(body.path).toBe(path)
    expect(body.method).toBe(method)
    expect(body.status).toBe(status)
    expect(contact.contact).toBe(createPayload.contact)
    expect(body.data.ownerId).toBe(createPayload.ownerId)
  })

  it('should throw a validation error when does not send ownerId and each service', async () => {
    const status = 400
    const method = 'POST'
    const code = 'Error'
    const path = `/contacts?secret=${secret}`

    const { body } = await request(app.server.getHttpServer())
      .post(path)
      .set('api_key', apiKey)
      .send({ ...createPayload, ownerId: null })
      .expect(status)

    expect(body.code).toBe(code)
    expect(body.path).toBe(path)
    expect(body.method).toBe(method)
    expect(body.status).toBe(status)
    expect(body.error).toEqual({
      name: 'Error',
      message: {
        statusCode: status,
        message: ['ownerId should not be empty', 'ownerId must be a string'],
        error: 'Bad Request',
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
