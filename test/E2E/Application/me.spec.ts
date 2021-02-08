import 'start/env'

import * as request from 'supertest'
import { payload } from './constants'
import { AppModule } from 'app/AppModule'
import { App, Database } from 'test/Utils'
import { Token } from '@secjs/core/build/Utils/Classes/Token'
import { random } from '@secjs/core/build/Utils/Functions/random'
import { TokenRepository } from 'app/Repositories/TokenRepository'
import { ApplicationRepository } from 'app/Repositories/ApplicationRepository'

describe('\n[E2E] Me Application 🏘', () => {
  it('should return an application by apiKey and secret', async () => {
    const application = await appRepository.storeOne({ ...payload })

    const apiKey = await tokenRepository.storeOne({
      ip: '192.168.0.1',
      application,
      title: 'API_KEY',
      type: 'api_token',
      token: new Token().changePrefix('tkn', application.token),
      value: await random(36),
    })
    const secret = await tokenRepository.storeOne({
      ip: '192.168.0.1',
      application,
      title: 'API_SECRET',
      type: 'api_secret',
      token: new Token().changePrefix('tkn', application.token),
      value: await random(36),
    })

    const status = 200
    const method = 'GET'
    const code = 'RESPONSE'
    const path = `/applications/me?secret=${secret.value}`

    const { body } = await request(app.server.getHttpServer())
      .get(path)
      .set('api_key', apiKey.value)
      .expect(status)

    expect(body.code).toBe(code)
    expect(body.path).toBe(path)
    expect(body.method).toBe(method)
    expect(body.status).toBe(status)
    expect(body.data._id).toBe(`${application._id}`)
  })

  it('should throw a token invalid exception when tokenApi does not exist', async () => {
    const status = 401
    const method = 'GET'
    const code = 'Error'
    const path = '/applications/me?secret=aaaa'

    const { body } = await request(app.server.getHttpServer())
      .get(path)
      .set('api_key', 'aaaa')
      .expect(status)

    expect(body.code).toBe(code)
    expect(body.path).toBe(path)
    expect(body.method).toBe(method)
    expect(body.status).toBe(status)
    return expect(body.error).toEqual({
      name: 'Error',
      message: {
        error: 'Unauthorized',
        message: 'TOKEN_INVALID',
        statusCode: status,
      },
    })
  })

  it('should throw a token invalid exception when secret does not exist', async () => {
    const application = await appRepository.storeOne({ ...payload })

    const apiKey = await tokenRepository.storeOne({
      ip: '192.168.0.1',
      application,
      title: 'API_KEY',
      type: 'api_token',
      token: new Token().changePrefix('tkn', application.token),
      value: await random(36),
    })

    const status = 401
    const method = 'GET'
    const code = 'Error'
    const path = `/applications/me?secret=aaaa`

    const { body } = await request(app.server.getHttpServer())
      .get(path)
      .set('api_key', apiKey.value)
      .expect(status)

    expect(body.code).toBe(code)
    expect(body.path).toBe(path)
    expect(body.method).toBe(method)
    expect(body.status).toBe(status)
    return expect(body.error).toEqual({
      name: 'Error',
      message: {
        error: 'Unauthorized',
        message: 'TOKEN_INVALID',
        statusCode: status,
      },
    })
  })

  it('should throw a token invalid exception when apiKey and secret has different tokens', async () => {
    const application = await appRepository.storeOne({ ...payload })

    const apiKey = await tokenRepository.storeOne({
      ip: '192.168.0.1',
      application,
      title: 'API_KEY',
      type: 'api_token',
      token: new Token().changePrefix('tkn', application.token),
      value: await random(36),
    })
    const secret = await tokenRepository.storeOne({
      ip: '192.168.0.1',
      application,
      title: 'API_SECRET',
      type: 'api_secret',
      token: new Token().changePrefix('tkn', new Token().generate('aaa')),
      value: await random(36),
    })

    const status = 401
    const method = 'GET'
    const code = 'Error'
    const path = `/applications/me?secret=${secret.value}`

    const { body } = await request(app.server.getHttpServer())
      .get(path)
      .set('api_key', apiKey.value)
      .expect(status)

    expect(body.code).toBe(code)
    expect(body.path).toBe(path)
    expect(body.method).toBe(method)
    expect(body.status).toBe(status)
    return expect(body.error).toEqual({
      name: 'Error',
      message: {
        error: 'Unauthorized',
        message: 'TOKEN_INVALID',
        statusCode: status,
      },
    })
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
