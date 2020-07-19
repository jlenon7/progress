import { uuid } from 'uuidv4'
import { isEqual, getMonth, getYear } from 'date-fns'

import Appointment from '@Modules/Appointments/Infra/Typeorm/Entities/Appointment'
import IAppointmentsRepository from '@Modules/Appointments/Repositories/IAppointmentsRepository'
import ICreateAppointmentDTO from '@Modules/Appointments/Dtos/ICreateAppointmentDTO'
import IFindAllInMonthFromProviderDTO from '@Modules/Appointments/Dtos/IFindAllInMonthFromProviderDTO'

class AppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = []

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(appointment =>
      isEqual(appointment.date, date),
    )

    return findAppointment
  }

  public async findAllInMonthFromProvider({
    provider_id,
    month,
    year,
  }: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter(
      appointment =>
        appointment.provider_id === provider_id &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year,
    )

    return appointments
  }

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment()

    Object.assign(appointment, { id: uuid(), date, provider_id })

    this.appointments.push(appointment)

    return appointment
  }
}

export default AppointmentsRepository
