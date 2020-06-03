import { Request, Response } from "express"
import Database from '../Database/StartDatabase'

class ItemsController {
  private Connection: any

  constructor() {
    this.Connection = new Database().PostgreSQL()
  }

  public async index(request: Request, response: Response): Promise<Response> {
    console.log('oi')
    const items = await this.Connection('items').select('*')
    console.log('aaa')
  
    return response.json(items)
  }
}

export default ItemsController

