import FakeUsersRepository from '../Repositories/Fakes/FakeUsersRepository'
import FakeHashProvider from '../Providers/HashProvider/Fakes/FakeHashProvider'
import CreateUserService from './CreateUserService'
import AppError from '@Shared/Errors/AppError'

describe('> Users [CREATE]', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository()
    const fakeHashProvider = new FakeHashProvider()
    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    )

    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(user).toHaveProperty('id')
  })

  it('should not be able to create a new user with same email from another', async () => {
    const fakeUsersRepository = new FakeUsersRepository()
    const fakeHashProvider = new FakeHashProvider()
    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    )

    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    await expect(
      createUser.execute({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })
})
