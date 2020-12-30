import FakeUsersRepository from '@Modules/Users/Repositories/Fakes/FakeUsersRepository'
import ListProvidersService from './ListProvidersService'
// import AppError from '@Shared/Errors/AppError'

let fakeUsersRepository: FakeUsersRepository
let listProviders: ListProvidersService

describe('> ListProvidersService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()

    listProviders = new ListProvidersService(fakeUsersRepository)
  })

  it('should be able to show list the providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const user2 = await fakeUsersRepository.create({
      name: 'John Tres',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const loggedUser = await fakeUsersRepository.create({
      name: 'John Quatro',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const providers = await listProviders.execute({
      user_id: loggedUser.id,
    })

    expect(providers).toEqual([user1, user2])
  })
})
