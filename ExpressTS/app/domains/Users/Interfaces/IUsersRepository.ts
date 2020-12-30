import User from '@Modules/Users/Infra/Entities/User'
import ICreateUserDTO from '@Modules/Users/DTO/ICreateUserDTO'

export default interface IUsersRepository {
  findById(id: string): Promise<User | undefined>
  findByEmail(email: string): Promise<User | undefined>
  create(data: ICreateUserDTO): Promise<User>
  save(user: User): Promise<User>
}