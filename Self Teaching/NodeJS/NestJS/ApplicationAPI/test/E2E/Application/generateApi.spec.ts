import 'start/env'

import * as request from 'supertest'
import { payload } from './constants'
import { AppModule } from 'app/AppModule'
import { App, Database } from 'test/Utils'
import { TokenRepository } from 'app/Repositories/TokenRepository'
import { ApplicationRepository } from 'app/Repositories/ApplicationRepository'

describe('\n[E2E] Generate Application API 🏘', () => {
  it('should store one application api with secret and apiKey', async () => {
    const application = await appRepository.storeOne(payload)

    const status = 201
    const method = 'POST'
    const code = 'RESPONSE'
    const path = `/applications/${application._id}/api`

    const { body } = await request(app.server.getHttpServer())
      .post(path)
      .expect(status)

    const apiKey = await tokenRepository.getOne(null, {
      where: [
        { key: 'application', value: application._id },
        { key: 'type', value: 'api_key' },
      ],
    })

    const secret = await tokenRepository.getOne(null, {
      where: [
        { key: 'application', value: application._id },
        { key: 'type', value: 'api_secret' },
      ],
    })

    expect(body.code).toBe(code)
    expect(body.path).toBe(path)
    expect(body.method).toBe(method)
    expect(body.status).toBe(status)
    expect(body.data.apiKey).toBe(apiKey.value)
    expect(body.data.secret).toBe(secret.value)
  })
})

let app: App
let database: Database
let appRepository: ApplicationRepository
let tokenRepository: TokenRepository

beforeEach(async () => {
  app = await new App([AppModule]).initApp()
  database = new Database(app)

  appRepository = database.getRepository(ApplicationRepository)
  tokenRepository = database.getRepository(TokenRepository)
})

afterEach(async () => {
  await database.truncate()
  await database.closeConnection()
  await app.closeApp()
})
