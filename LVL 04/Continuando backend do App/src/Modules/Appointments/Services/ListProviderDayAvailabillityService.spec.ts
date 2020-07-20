import FakeAppointmentsRepository from '@Modules/Appointments/Repositories/Fakes/FakeAppointmentsRepository'
import ListProviderDayAvailabillityService from './ListProviderDayAvailabillityService'
// import AppError from '@Shared/Errors/AppError'

let fakeAppointmentRepository: FakeAppointmentsRepository
let listProviderDayAvailabiliity: ListProviderDayAvailabillityService

describe('> ListProviderDayAvailabillityService', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentsRepository()

    listProviderDayAvailabiliity = new ListProviderDayAvailabillityService(
      fakeAppointmentRepository,
    )
  })

  it('should be able to list the day availabillity from provider', async () => {
    await fakeAppointmentRepository.create({
      provider_id: 'user',
      date: new Date(2020, 4, 20, 8, 0, 0),
    })
    await fakeAppointmentRepository.create({
      provider_id: 'user',
      date: new Date(2020, 4, 20, 10, 0, 0),
    })

    const availabillity = await listProviderDayAvailabiliity.execute({
      provider_id: 'user',
      year: 2020,
      month: 5,
      day: 20,
    })

    expect(availabillity).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: true },
        { hour: 10, available: false },
        { hour: 11, available: true },
      ]),
    )
  })
})
