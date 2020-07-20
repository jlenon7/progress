import { injectable, inject } from 'tsyringe'
import IAppointmentsRepository from '../Repositories/IAppointmentsRepository'
import { getHours } from 'date-fns'
// import User from '@Modules/Users/Infra/Typeorm/Entities/User'

interface IRequest {
  provider_id: string
  month: number
  year: number
  day: number
}

type IResponse = Array<{
  hour: number
  available: boolean
}>

@injectable()
class ListProviderDayAvailabillityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    provider_id,
    month,
    year,
    day,
  }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentsRepository.findAllInDayFromProvider(
      {
        provider_id,
        month,
        year,
        day,
      },
    )

    const hourStart = 8
    const eachHourArray = Array.from(
      { length: 10 },
      (_, index) => index + hourStart,
    )

    const availabillity = eachHourArray.map(hour => {
      const hasAppointmentInHour = appointments.find(
        appointment => getHours(appointment.date) === hour,
      )

      return {
        hour,
        available: !hasAppointmentInHour,
      }
    })

    return availabillity
  }
}

export default ListProviderDayAvailabillityService
