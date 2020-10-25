import Appointment from '@Modules/Appointments/Infra/Typeorm/Entities/Appointment'
import ICreateAppointmentDTO from '@Modules/Appointments/Dtos/ICreateAppointmentDTO'
import IFindAllInMonthFromProviderDTO from '../Dtos/IFindAllInMonthFromProviderDTO'
import IFindAllInDayFromProviderDTO from '../Dtos/IFindAllInDayFromProviderDTO'

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>
  findByDate(date: Date, provider_id: string): Promise<Appointment | undefined>
  findAllInMonthFromProvider(
    data: IFindAllInMonthFromProviderDTO,
  ): Promise<Appointment[]>
  findAllInDayFromProvider(
    data: IFindAllInDayFromProviderDTO,
  ): Promise<Appointment[]>
}
