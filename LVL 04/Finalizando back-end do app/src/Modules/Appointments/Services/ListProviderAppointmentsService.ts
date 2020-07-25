import { injectable, inject } from 'tsyringe'
import IAppointmentsRepository from '../Repositories/IAppointmentsRepository'
import Appointment from '@Modules/Appointments/Infra/Typeorm/Entities/Appointment'

interface IRequest {
  provider_id: string
  day: number
  month: number
  year: number
}

@injectable()
class ListProviderAppointmentsService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    provider_id,
    day,
    month,
    year,
  }: IRequest): Promise<Appointment[]> {
    const appointments = await this.appointmentsRepository.findAllInDayFromProvider(
      {
        provider_id,
        year,
        day,
        month,
      },
    )

    return appointments
  }
}

export default ListProviderAppointmentsService
