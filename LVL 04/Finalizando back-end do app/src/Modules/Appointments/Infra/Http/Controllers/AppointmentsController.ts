import { Request, Response } from 'express'
import { parseISO } from 'date-fns'
import { container } from 'tsyringe'

import CreateAppointmentService from '@Modules/Appointments/Services/CreateAppointmentService'

export default class AppointmentController {
  public async store(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id
    const { provider_id, date } = request.body

    const parsedDate = parseISO(date)

    const createAppointment = container.resolve(CreateAppointmentService)

    const appointment = await createAppointment.execute({
      date: parsedDate,
      provider_id,
      user_id,
    })

    return response.json(appointment)
  }
}
