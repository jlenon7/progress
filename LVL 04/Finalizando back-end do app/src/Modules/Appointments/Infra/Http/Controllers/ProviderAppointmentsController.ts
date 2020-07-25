import { Request, Response } from 'express'
import { container } from 'tsyringe'

import ListProviderAppointmentsService from '@Modules/Appointments/Services/ListProviderAppointmentsService'

export default class ProviderAppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const provider_id = request.user.id
    const { day, month, year } = request.body

    const listProviderAppointments = container.resolve(
      ListProviderAppointmentsService,
    )

    const appointment = await listProviderAppointments.execute({
      provider_id,
      day,
      month,
      year,
    })

    return response.json(appointment)
  }
}
