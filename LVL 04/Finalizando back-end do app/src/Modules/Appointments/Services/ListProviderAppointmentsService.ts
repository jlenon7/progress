import { injectable, inject } from 'tsyringe'
import IAppointmentsRepository from '../Repositories/IAppointmentsRepository'
import Appointment from '@Modules/Appointments/Infra/Typeorm/Entities/Appointment'
import ICacheProvider from '@Shared/Container/Providers/CacheProvider/Models/ICacheProvider'
import { classToClass } from 'class-transformer'

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

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    provider_id,
    day,
    month,
    year,
  }: IRequest): Promise<Appointment[]> {
    const cacheKey = `provider-appointments:${provider_id}:${year}-${month}-${day}`
    let appointments = await this.cacheProvider.recover<Appointment[]>(cacheKey)

    if (!appointments) {
      appointments = await this.appointmentsRepository.findAllInDayFromProvider(
        {
          provider_id,
          year,
          day,
          month,
        },
      )

      await this.cacheProvider.save(cacheKey, classToClass(appointments))
    }

    return appointments
  }
}

export default ListProviderAppointmentsService
