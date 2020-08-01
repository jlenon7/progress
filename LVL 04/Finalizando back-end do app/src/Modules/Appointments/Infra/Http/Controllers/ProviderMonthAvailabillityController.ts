import { Request, Response } from 'express'
import { container } from 'tsyringe'

import ListProviderMonthAvailabillityService from '@Modules/Appointments/Services/ListProviderMonthAvailabillityService'

export default class ProviderMonthAvailabillityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params
    const { month, year } = request.query

    const listProviderMonthAvailabillity = container.resolve(
      ListProviderMonthAvailabillityService,
    )

    const availabillity = await listProviderMonthAvailabillity.execute({
      provider_id,
      month: Number(month),
      year: Number(year),
    })

    return response.json({ availabillity })
  }
}
