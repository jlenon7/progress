import 'start/env'

import * as request from 'supertest'
import { AppModule } from 'app/AppModule'
import { App, Database } from 'test/Utils'
import { createPayload } from './constants'

describe('\n[E2E] Store Application 🏘', () => {
  it('should store one application', async () => {
    const status = 201
    const method = 'POST'
    const code = 'RESPONSE'
    const path = '/applications'

    const { body } = await request(app.server.getHttpServer())
      .post(path)
      .send(createPayload)
      .expect(status)

    expect(body.code).toBe(code)
    expect(body.path).toBe(path)
    expect(body.method).toBe(method)
    expect(body.status).toBe(status)
    expect(body.data.email).toBe(createPayload.email)
  })

  it('should throw a validation error when does not send required payloads', async () => {
    const status = 400
    const method = 'POST'
    const code = 'Error'
    const path = '/applications'

    const { body } = await request(app.server.getHttpServer())
      .post(path)
      .send({ ...createPayload, email: null })
      .expect(status)

    expect(body.code).toBe(code)
    expect(body.path).toBe(path)
    expect(body.method).toBe(method)
    expect(body.status).toBe(status)
    expect(body.error).toEqual({
      name: 'Error',
      message: {
        statusCode: 400,
        message: ['email should not be empty', 'email must be a string'],
        error: 'Bad Request',
      },
    })
  })
})

let app: App
let database: Database

beforeEach(async () => {
  app = await new App([AppModule]).initApp()
  database = new Database(app)
})

afterEach(async () => {
  await database.truncate()
  await database.closeConnection()
  await app.closeApp()
})
