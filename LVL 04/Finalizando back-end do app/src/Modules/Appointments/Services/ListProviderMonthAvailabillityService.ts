import { injectable, inject } from 'tsyringe'
import IAppointmentsRepository from '../Repositories/IAppointmentsRepository'
import { getDaysInMonth, getDate } from 'date-fns'
// import User from '@Modules/Users/Infra/Typeorm/Entities/User'

interface IRequest {
  provider_id: string
  month: number
  year: number
}

type IResponse = Array<{
  day: number
  available: boolean
}>

@injectable()
class ListProviderMonthAvailabillityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    provider_id,
    month,
    year,
  }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentsRepository.findAllInMonthFromProvider(
      { provider_id, month, year },
    )

    const numberOfDaysInMonth = getDaysInMonth(new Date(year, month - 1))

    const eachDayArray = Array.from(
      { length: numberOfDaysInMonth },
      (_, index) => index + 1,
    )

    const availabillity = eachDayArray.map(day => {
      const appointmentsInDay = appointments.filter(appointment => {
        return getDate(appointment.date) === day
      })

      return {
        day,
        available: appointmentsInDay.length < 10,
      }
    })

    return availabillity
  }
}

export default ListProviderMonthAvailabillityService
