import FakeAppointmentsRepository from '@Modules/Appointments/Repositories/Fakes/FakeAppointmentsRepository'
import ListProviderAppointmentsService from './ListProviderAppointmentsService'
import FakeCacheProvider from '@Shared/Container/Providers/CacheProvider/Fakes/FakeCacheProvider'
// import AppError from '@Shared/Errors/AppError'

let fakeCacheProvider: FakeCacheProvider
let fakeAppointmentRepository: FakeAppointmentsRepository
let listProviderAppointments: ListProviderAppointmentsService

describe('> ListProviderAppointmentsService', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentsRepository()
    fakeCacheProvider = new FakeCacheProvider()

    listProviderAppointments = new ListProviderAppointmentsService(
      fakeAppointmentRepository,
      fakeCacheProvider,
    )
  })

  it('should be able to list the appointments on a specific day', async () => {
    const appointment1 = await fakeAppointmentRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2020, 4, 20, 14, 0, 0),
    })
    const appointment2 = await fakeAppointmentRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2020, 4, 20, 15, 0, 0),
    })

    const appointments = await listProviderAppointments.execute({
      provider_id: 'provider',
      year: 2020,
      month: 5,
      day: 20,
    })

    expect(appointments).toEqual([appointment1, appointment2])
  })
})
