import { Request, Response } from "express"
import PointsService from '@App/Services/PointsService'
import { SecResponse } from '@jlenon7/dedSec/build/Responses'
import PointsRepository from '@App/Repositories/PointsRepository'

let dedRes: SecResponse
let service: PointsService
let repository: PointsRepository

export default class PointsController {
  constructor() {
    dedRes = new SecResponse()
    service = new PointsService()
    repository = new PointsRepository()
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const points = await repository.all(request.query)

    return response.json(dedRes.withOne(points, 'All points'))
  }

  public async store(request: Request, response: Response): Promise<Response> {
    const insertedId = await service.create(request.body)

    return response.json(dedRes.withOne({ id: insertedId[0], ...request.body}, 'Point Created'))
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const pointItems = await repository.getById(request.params.id)

    if (!pointItems) {
      return response.status(404).json(dedRes.withError(null, 'Point not found'))
    }

    return response.json(dedRes.withOne(pointItems, 'Showing Point'))
  }
}
