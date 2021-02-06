import { ResponseContract } from '@ioc:Adonis/Core/Response'

export interface SecResponseContract {
  withOne(payload: object): Promise<any>
  withNone(): Promise<any>
  withMessage(message: string): Promise<any>
  withCreated(payload: object): Promise<any>
  withCollection(payload: any): Promise<any>
  withSoftDeleted(payload: string | number): Promise<any>
}

export class SecResponse {
  private response: ResponseContract

  constructor(response: ResponseContract) {
    this.response = response
  }

  public async withOne(payload: object): Promise<void> {
    return this.response.status(200).json({
      code: 'ONE',
      path: this.response.request.url,
      method: this.response.request.method,
      status: 200,
      data: payload,
    })
  }

  public async withMessage(message: string): Promise<void> {
    return this.response.status(200).json({
      code: 'MESSAGE',
      path: this.response.request.url,
      method: this.response.request.method,
      status: 200,
      message,
    })
  }

  public async withNone(): Promise<void> {
    return this.response.status(204).json({
      code: 'NONE',
      path: this.response.request.url,
      method: this.response.request.method,
      status: 204,
    })
  }

  public async withCreated(payload: object): Promise<void> {
    return this.response.status(201).json({
      code: 'CREATED',
      path: this.response.request.url,
      method: this.response.request.method,
      status: 201,
      data: payload,
    })
  }

  public async withCollection(payload: any): Promise<void> {
    return this.response.status(200).json({
      code: 'COLLECTION',
      path: this.response.request.url,
      method: this.response.request.method,
      status: 200,
      data: payload.data,
      pagination: payload.meta,
    })
  }

  public async withSoftDeleted(payload: string | number): Promise<void> {
    return this.response.status(200).json({
      code: 'SOFT_DELETED',
      path: this.response.request.url,
      method: this.response.request.method,
      status: 200,
      data: {
        message: `[${payload}] Has been deleted`,
      },
    })
  }
}
