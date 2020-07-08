/* eslint-disable jest/valid-expect */
import FakeUsersRepository from '../Repositories/Fakes/FakeUsersRepository'
import FakeUserTokensRepository from '../Repositories/Fakes/FakeUserTokensRepository'
import ResetPasswordService from './ResetPasswordService'
// import AppError from '@Shared/Errors/AppError'

let fakeUsersRepository: FakeUsersRepository
let fakeUserTokensRepository: FakeUserTokensRepository
let resetPasswordService: ResetPasswordService

describe('> Reset Password [RESET]', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeUserTokensRepository = new FakeUserTokensRepository()

    resetPasswordService = new ResetPasswordService(
      fakeUsersRepository,
      fakeUserTokensRepository,
    )
  })

  it('should be able to reset the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const userToken = await fakeUserTokensRepository.generate(user.id)

    await resetPasswordService.execute({
      password: '123123',
      token: userToken.token,
    })

    const updateUser = await fakeUsersRepository.findById(user.id)

    expect(updateUser?.password).toBe('123123')
  })
})
