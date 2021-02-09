import 'start/env'

import * as request from 'supertest'
import { AppModule } from 'app/AppModule'
import { App, Database } from 'test/Utils'
import { apiRequest, payload, apiKey, secret } from './constants'
import { AddressRepository } from 'app/Repositories/AddressRepository'

describe('\n[E2E] Index Address 🏘', () => {
  it('should return all actived addresses paginated', async () => {
    const status = 200
    const method = 'PATCH'
    const code = 'RESPONSE'
    const path = `/addresses?secret=${secret}&page=0&limit=10`

    await addressRepository.storeOne(payload)
    await addressRepository.storeOne(payload)

    const { body } = await request(app.server.getHttpServer())
      .patch(path)
      .set('api_key', apiKey)
      .send(apiRequest)
      .expect(status)

    expect(body.code).toBe(code)
    expect(body.path).toBe(path)
    expect(body.method).toBe(method)
    expect(body.status).toBe(status)
    expect(body.data.data).toHaveLength(2)
    expect(body.data.pagination.page).toBe(0)
    expect(body.data.pagination.limit).toBe(10)
    expect(body.data.pagination.total).toBeTruthy()
  })

  it('should return all deleted addresses paginated an ordered DESC by deletedAt', async () => {
    const status = 200
    const method = 'PATCH'
    const code = 'RESPONSE'
    const path = `/addresses?secret=${secret}&page=0&limit=10`

    const address1 = await addressRepository.storeOne(payload)
    const address2 = await addressRepository.storeOne(payload)
    await addressRepository.storeOne(payload)

    await addressRepository.deleteOne(`${address1._id}`)
    const secondDeleted = await addressRepository.deleteOne(`${address2._id}`)

    const { body } = await request(app.server.getHttpServer())
      .patch(path)
      .set('api_key', apiKey)
      .send({
        ...apiRequest,
        where: [{ key: 'status', value: 'deleted' }],
        orderBy: [{ key: 'deletedAt', ordenation: 'DESC' }],
      })
      .expect(status)

    expect(body.code).toBe(code)
    expect(body.path).toBe(path)
    expect(body.method).toBe(method)
    expect(body.status).toBe(status)
    expect(body.data.data).toHaveLength(2)
    expect(body.data.pagination.page).toBe(0)
    expect(body.data.pagination.limit).toBe(10)
    expect(body.data.pagination.total).toBeTruthy()
    expect(body.data.data[0].deletedAt).toBe(secondDeleted.deletedAt.toJSON())
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
