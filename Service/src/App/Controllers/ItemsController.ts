import { Request, Response } from "express"
import ItemsService from '@App/Services/ItemsService'
import { SecResponse } from '@jlenon7/dedSec/build/Responses'
import ItemsRepository from '@App/Repositories/ItemsRepository'

let dedRes: SecResponse
let service: ItemsService
let repository: ItemsRepository

class ItemsController {
  constructor() {
    repository = new ItemsRepository()
    service = new ItemsService()
    dedRes = new SecResponse()
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const items = await repository.all()
  
    return response.json(dedRes.withCollection(items, 'Index Items'))
  }
}

export default ItemsController

