import Appointment from '@Modules/Appointments/Infra/Typeorm/Entities/Appointment'
import ICreateAppointmentDTO from '@Modules/Appointments/Dtos/ICreateAppointmentDTO'

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>
  findByDate(date: Date): Promise<Appointment | undefined>
}
