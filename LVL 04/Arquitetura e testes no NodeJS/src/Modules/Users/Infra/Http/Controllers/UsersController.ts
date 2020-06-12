import { Request, Response } from 'express'
import { container } from 'tsyringe'

import UsersService from '@Modules/Users/Services/UsersService'

export default class UsersController {
  public async store(request: Request, response: Response): Promise<Response> {
    
  }
}
