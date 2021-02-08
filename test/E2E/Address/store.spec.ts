import 'start/env'

import * as request from 'supertest'
import { AppModule } from 'app/AppModule'
import { App, Database } from 'test/Utils'
import { createPayload, secret, apiKey } from './constants'
import { AddressRepository } from 'app/Repositories/AddressRepository'

describe('\n[E2E] Store Address 🏘', () => {
  it('should store one address', async () => {
    const status = 201
    const method = 'POST'
    const code = 'RESPONSE'
    const path = `/addresses?secret=${secret}`

    const { body } = await request(app.server.getHttpServer())
      .post(path)
      .set('api_key', apiKey)
      .send(createPayload)
      .expect(status)

    const address = await addressRepository.getOne(null, {
      where: [{ key: 'owner_id', value: createPayload.owner_id }],
    })

    expect(body.code).toBe(code)
    expect(body.path).toBe(path)
    expect(body.method).toBe(method)
    expect(body.status).toBe(status)
    expect(address.street).toBe(createPayload.street)
    expect(body.data.owner_id).toBe(createPayload.owner_id)
  })

  it('should throw a validation error when does not send owner_id and each service', async () => {
    const status = 400
    const method = 'POST'
    const code = 'Error'
    const path = `/addresses?secret=${secret}`

    const { body } = await request(app.server.getHttpServer())
      .post(path)
      .set('api_key', apiKey)
      .send({ ...createPayload, owner_id: null })
      .expect(status)

    expect(body.code).toBe(code)
    expect(body.path).toBe(path)
    expect(body.method).toBe(method)
    expect(body.status).toBe(status)
    expect(body.error).toEqual({
      name: 'Error',
      message: {
        statusCode: status,
        message: ['owner_id should not be empty', 'owner_id must be a string'],
        error: 'Bad Request',
      },
    })
  })
})

let app: App
let database: Database
let addressRepository: AddressRepository

beforeEach(async () => {
  app = await new App([AppModule]).initApp()
  database = new Database(app)

  addressRepository = database.getRepository(AddressRepository)
})

afterEach(async () => {
  await database.truncate()
  await database.closeConnection()
  await app.closeApp()
})
