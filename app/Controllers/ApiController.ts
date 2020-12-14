import { RequestContract } from '@ioc:Adonis/Core/Request'
import { ResponseContract } from '@ioc:Adonis/Core/Response'
import { SecRequestContract, SecRequest } from './SecRequest'
import { SecResponseContract, SecResponse } from './SecResponse'

export class ApiController {
  private _request: RequestContract
  private _response: ResponseContract

  public request(request: RequestContract): SecRequestContract {
    this._request = request

    return new SecRequest(this._request)
  }

  public response(response: ResponseContract): SecResponseContract {
    this._response = response

    return new SecResponse(this._response)
  }
}
