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
      date: new Date(2020, 4, 20, 14, 0, 0),
    })
    await fakeAppointmentRepository.create({
      provider_id: 'user',
      date: new Date(2020, 4, 20, 15, 0, 0),
    })

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 20, 11).getTime()
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
        { hour: 9, available: false },
        { hour: 10, available: false },
        { hour: 13, available: true },
        { hour: 14, available: false },
        { hour: 15, available: false },
        { hour: 16, available: true },
      ]),
    )
  })
})
