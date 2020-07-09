import Appointment from '@Modules/Appointments/Infra/Typeorm/Entities/Appointment'
import IAppointmentsRepository from '@Modules/Appointments/Repositories/IAppointmentsRepository'
import ICreateAppointmentDTO from '@Modules/Appointments/Dtos/ICreateAppointmentDTO'       

import { getRepository, Repository } from 'typeorm'

class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>

  constructor() {
    this.ormRepository = getRepository(Appointment)
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: { date },
    })

    return findAppointment || undefined
  }

  public async create({ provider_id, date }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({ provider_id, date });

    await this.ormRepository.save(appointment)

    return appointment
  }
}

export default AppointmentsRepository
