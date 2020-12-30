import { Request, Response } from 'express'
import { container } from 'tsyringe'

import ListProviderDayAvailabillityService from '@Modules/Appointments/Services/ListProviderDayAvailabillityService'

export default class ProviderDayAvailabillityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params
    const { day, month, year } = request.body

    const listProviderDayAvailabillity = container.resolve(
      ListProviderDayAvailabillityService,
    )

    const availabillity = await listProviderDayAvailabillity.execute({
      provider_id,
      day,
      month,
      year,
    })

    return response.json({ availabillity })
  }
}
