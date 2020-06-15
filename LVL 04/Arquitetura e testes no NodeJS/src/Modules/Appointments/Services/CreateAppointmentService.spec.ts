import FakeAppointmentRepository from '../Repositories/Fakes/FakeAppointmentsRepository'
import CreateAppointmentService from './CreateAppointmentService'

describe('> Appointments [CREATE]', async () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentRepository = new FakeAppointmentRepository()
    const createAppointment = new CreateAppointmentService(fakeAppointmentRepository)

    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '123123'
    })

    expect(appointment).toHaveProperty('id')
    expect(appointment.provider_id).toBe('123123')
  })

  // it('should not be able to create two appointments on the same time', () => {
  //   expect(1 + 2).toBe(3)
  // })
})
