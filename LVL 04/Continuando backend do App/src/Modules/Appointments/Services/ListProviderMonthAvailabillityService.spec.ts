import FakeAppointmentsRepository from '@Modules/Appointments/Repositories/Fakes/FakeAppointmentsRepository'
import ListProviderMonthAvailabillityService from './ListProviderMonthAvailabillityService'
// import AppError from '@Shared/Errors/AppError'

let fakeAppointmentRepository: FakeAppointmentsRepository
let listProviderMonthAvailabiliity: ListProviderMonthAvailabillityService

describe('> ListProviderMonthAvailabillityService', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentsRepository()

    listProviderMonthAvailabiliity = new ListProviderMonthAvailabillityService(
      fakeAppointmentRepository,
    )
  })

  it('should be able to list the month availabillity from provider', async () => {
    await fakeAppointmentRepository.create({
      provider_id: 'user',
      date: new Date(2020, 4, 20, 8, 0, 0),
    })
    await fakeAppointmentRepository.create({
      provider_id: 'user',
      date: new Date(2020, 4, 20, 9, 0, 0),
    })
    await fakeAppointmentRepository.create({
      provider_id: 'user',
      date: new Date(2020, 4, 20, 10, 0, 0),
    })
    await fakeAppointmentRepository.create({
      provider_id: 'user',
      date: new Date(2020, 4, 20, 11, 0, 0),
    })
    await fakeAppointmentRepository.create({
      provider_id: 'user',
      date: new Date(2020, 4, 20, 12, 0, 0),
    })
    await fakeAppointmentRepository.create({
      provider_id: 'user',
      date: new Date(2020, 4, 20, 13, 0, 0),
    })
    await fakeAppointmentRepository.create({
      provider_id: 'user',
      date: new Date(2020, 4, 20, 14, 0, 0),
    })
    await fakeAppointmentRepository.create({
      provider_id: 'user',
      date: new Date(2020, 4, 20, 15, 0, 0),
    })
    await fakeAppointmentRepository.create({
      provider_id: 'user',
      date: new Date(2020, 4, 20, 16, 0, 0),
    })
    await fakeAppointmentRepository.create({
      provider_id: 'user',
      date: new Date(2020, 4, 20, 17, 0, 0),
    })

    await fakeAppointmentRepository.create({
      provider_id: 'user',
      date: new Date(2020, 4, 21, 8, 0, 0),
    })

    const availabillity = await listProviderMonthAvailabiliity.execute({
      provider_id: 'user',
      year: 2020,
      month: 5,
    })

    expect(availabillity).toEqual(
      expect.arrayContaining([
        { day: 19, available: true },
        { day: 20, available: false },
        { day: 21, available: true },
        { day: 22, available: true },
      ]),
    )
  })
})
