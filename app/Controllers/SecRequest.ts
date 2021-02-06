import { RequestContract } from '@ioc:Adonis/Core/Request'

export interface SecRequestContract {
  validate(ClassValidator: any): Promise<any>
}

export class SecRequest {
  private request: RequestContract

  constructor(request: RequestContract) {
    this.request = request
  }

  public async validate(ClassValidator: any): Promise<any> {
    return this.request.validate(ClassValidator)
  }
}
