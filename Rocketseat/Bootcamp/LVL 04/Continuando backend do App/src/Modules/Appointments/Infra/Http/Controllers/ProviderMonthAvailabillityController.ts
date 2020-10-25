import { Request, Response } from 'express'
import { container } from 'tsyringe'

import ListProviderMonthAvailabillityService from '@Modules/Appointments/Services/ListProviderMonthAvailabillityService'

export default class ProviderMonthAvailabillityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params
    const { month, year } = request.body

    const listProviderMonthAvailabillity = container.resolve(
      ListProviderMonthAvailabillityService,
    )

    const availabillity = await listProviderMonthAvailabillity.execute({
      provider_id,
      month,
      year,
    })

    return response.json({ availabillity })
  }
}
