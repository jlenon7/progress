import { startOfHour } from 'date-fns'

import { getCustomRepository } from 'typeorm'

import Appointmet from '@Modules/Appointments/Infra/Typeorm/Entities/Appointment'
import AppointmentsRepository from '@Modules/Appointments/Repositories/AppointmentsRepository'
import AppError from '@Shared/Errors/AppError'

interface IRequest {
  provider_id: string
  date: Date
}

class CreateAppointmentService {
  public async execute({ provider_id, date }: IRequest): Promise<Appointmet> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository)
    const appointmentDate = startOfHour(date)

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate,
    )

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked')
    }

    const appointment = appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    })

    await appointmentsRepository.save(appointment)

    return appointment
  }
}

export default CreateAppointmentService
