import 'start/env'

import * as request from 'supertest'
import { payload, apiKey, secret } from './constants'
import { AppModule } from 'app/AppModule'
import { App, Database } from 'test/Utils'
import { AddressRepository } from 'app/Repositories/AddressRepository'

describe('\n[E2E] Delete Address 🏘', () => {
  it('should delete one address', async () => {
    const address = await addressRepository.storeOne(payload)

    const status = 200
    const method = 'DELETE'
    const code = 'RESPONSE'
    const path = `/addresses/${address._id}?secret=${secret}`

    const { body } = await request(app.server.getHttpServer())
      .delete(path)
      .set('api_key', apiKey)
      .expect(status)

    expect(body.code).toBe(code)
    expect(body.path).toBe(path)
    expect(body.method).toBe(method)
    expect(body.status).toBe(status)
    expect(body.data.status).toBe('deleted')
    expect(body.data._id).toBe(`${address._id}`)
  })

  it('should throw a not valid ObjectId error', async () => {
    const status = 500
    const method = 'DELETE'
    const code = 'Error'
    const path = `/addresses/null-id?secret=${secret}`

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
    const path = `/addresses/601d80cf50ee4620e3373371?secret=${secret}`

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