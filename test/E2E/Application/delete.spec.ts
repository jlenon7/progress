import 'start/env'

import * as request from 'supertest'
import { payload } from './constants'
import { AppModule } from 'app/AppModule'
import { App, Database } from 'test/Utils'
import { ApplicationRepository } from 'app/Repositories/ApplicationRepository'

describe('\n[E2E] Delete Application 🏘', () => {
  it('should delete one application', async () => {
    const application = await appRepository.storeOne({ ...payload })

    const status = 200
    const method = 'DELETE'
    const code = 'RESPONSE'
    const path = `/applications/${application._id}`

    const { body } = await request(app.server.getHttpServer())
      .delete(path)
      .expect(status)

    expect(body.code).toBe(code)
    expect(body.path).toBe(path)
    expect(body.method).toBe(method)
    expect(body.status).toBe(status)
    expect(body.data.status).toBe('deleted')
    expect(body.data._id).toBe(`${application._id}`)
  })

  it('should throw a not valid ObjectId error', async () => {
    const status = 500
    const method = 'DELETE'
    const code = 'Error'
    const path = '/applications/null-id'

    const { body } = await request(app.server.getHttpServer())
      .delete(path)
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
    const path = '/applications/601d80cf50ee4620e3373371'

    const { body } = await request(app.server.getHttpServer())
      .delete(path)
      .expect(status)

    expect(body.code).toBe(code)
    expect(body.path).toBe(path)
    expect(body.method).toBe(method)
    expect(body.status).toBe(status)
    expect(body.error).toEqual({
      name: 'Error',
      message: {
        error: 'Not Found',
        message: 'NOT_FOUND_APPLICATION',
        statusCode: 404,
      },
    })
  })
})

let app: App
let database: Database
let appRepository: ApplicationRepository

beforeEach(async () => {
  app = await new App([AppModule]).initApp()
  database = new Database(app)

  appRepository = database.getRepository(ApplicationRepository)
})

afterEach(async () => {
  await database.truncate()
  await database.closeConnection()
  await app.closeApp()
})
