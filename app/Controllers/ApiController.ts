import { RequestContract } from '@ioc:Adonis/Core/Request'
import { ResponseContract } from '@ioc:Adonis/Core/Response'
import InternalServerException from 'App/Exceptions/InternalServerException'

export interface ApiContract {
  request?: RequestContract
  response?: ResponseContract
}

export class ApiController {
  private _request?: RequestContract
  private _response?: ResponseContract

  constructor({ request, response }: ApiContract) {
    this._request = request
    this._response = response
  }

  public get request(): RequestContract {
    if (!this._request) {
      throw new InternalServerException('REQUEST_UNSETED')
    }

    return this._request
  }

  public get response(): ResponseContract {
    if (!this._response) {
      throw new InternalServerException('RESPONSE_UNSETED')
    }

    return this._response
  }

  public async validate(ClassValidator: any): Promise<any> {
    return this.request.validate(ClassValidator)
  }

  public async resWithOne(payload: object): Promise<void> {
    return this.response.status(200).json({
      code: 'ONE',
      status: 200,
      data: payload,
    })
  }

  public async resWithNone(): Promise<void> {
    return this.response.status(204).json({
      code: 'NONE',
      status: 204,
    })
  }

  public async resWithCreated(payload: object): Promise<void> {
    return this.response.status(201).json({
      code: 'CREATED',
      status: 201,
      data: payload,
    })
  }

  public async resWithCollection(payload: []): Promise<void> {
    return this.response.status(200).json({
      code: 'COLLECTION',
      status: 200,
      data: payload,
    })
  }

  public async resWithSoftDeleted(payload: string | number): Promise<void> {
    return this.response.status(200).json({
      code: 'SOFT_DELETED',
      status: 200,
      data: {
        message: `[${payload}] Has been deleted`,
      },
    })
  }
}
