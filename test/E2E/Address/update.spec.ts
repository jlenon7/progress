import 'start/env'

import * as request from 'supertest'
import { AppModule } from 'app/AppModule'
import { App, Database } from 'test/Utils'
import { payload, createPayload, apiKey, secret } from './constants'
import { AddressRepository } from 'app/Repositories/AddressRepository'

describe('\n[E2E] Update Address 🏘', () => {
  it('should update one address', async () => {
    const address = await addressRepository.storeOne(payload)

    const status = 200
    const method = 'PUT'
    const code = 'RESPONSE'
    const path = `/addresses/${address._id}?secret=${secret}`
    const updatePayload = {
      ...createPayload,
      street: 'Rua Rui Barbosa',
    }

    const { body } = await request(app.server.getHttpServer())
      .put(path)
      .set('api_key', apiKey)
      .send(updatePayload)
      .expect(status)

    expect(body.code).toBe(code)
    expect(body.path).toBe(path)
    expect(body.method).toBe(method)
    expect(body.status).toBe(status)
    expect(body.data._id).toBe(`${address._id}`)
    expect(body.data.street).toBe(updatePayload.street)
  })

  it('should throw a not valid ObjectId error', async () => {
    const status = 500
    const method = 'PUT'
    const code = 'Error'
    const path = `/addresses/null-id?secret=${secret}`

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
    const path = `/addresses/601d80cf50ee4620e3373371?secret=${secret}`

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
        message: 'NOT_FOUND_ADDRESS',
        statusCode: status,
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
