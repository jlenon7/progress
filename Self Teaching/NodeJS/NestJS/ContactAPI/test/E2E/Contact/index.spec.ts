import 'start/env'

import * as request from 'supertest'
import { AppModule } from 'app/AppModule'
import { App, Database } from 'test/Utils'
import { apiRequest, payload, apiKey, secret } from './constants'
import { ContactRepository } from 'app/Repositories/ContactRepository'

describe('\n[E2E] Index Contact 🏘', () => {
  it('should return all actived contacts paginated', async () => {
    const status = 200
    const method = 'PATCH'
    const code = 'RESPONSE'
    const path = `/contacts?secret=${secret}&page=0&limit=10`

    await contactRepository.storeOne(payload)
    await contactRepository.storeOne(payload)

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

  it('should return all deleted contacts paginated an ordered DESC by deletedAt', async () => {
    const status = 200
    const method = 'PATCH'
    const code = 'RESPONSE'
    const path = `/contacts?secret=${secret}&page=0&limit=10`

    const contact1 = await contactRepository.storeOne(payload)
    const contact2 = await contactRepository.storeOne(payload)
    await contactRepository.storeOne(payload)

    await contactRepository.deleteOne(`${contact1._id}`)
    const secondDeleted = await contactRepository.deleteOne(`${contact2._id}`)

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
