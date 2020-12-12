import { ResponseContract } from '@ioc:Adonis/Core/Response'

export interface SecResponseContract {
  withOne(payload: object): Promise<any>
  withNone(): Promise<any>
  withCreated(payload: object): Promise<any>
  withCollection(payload: []): Promise<any>
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
      status: 200,
      data: payload,
    })
  }

  public async withNone(): Promise<void> {
    return this.response.status(204).json({
      code: 'NONE',
      status: 204,
    })
  }

  public async withCreated(payload: object): Promise<void> {
    return this.response.status(201).json({
      code: 'CREATED',
      status: 201,
      data: payload,
    })
  }

  public async withCollection(payload: []): Promise<void> {
    return this.response.status(200).json({
      code: 'COLLECTION',
      status: 200,
      data: payload,
    })
  }

  public async withSoftDeleted(payload: string | number): Promise<void> {
    return this.response.status(200).json({
      code: 'SOFT_DELETED',
      status: 200,
      data: {
        message: `[${payload}] Has been deleted`,
      },
    })
  }
}
