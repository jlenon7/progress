import User from '@Modules/Users/Infra/Typeorm/Entities/User'
import ICreateUserDTO from '@Modules/Users/Dtos/ICreateUserDTO'
import IFindAllProvidersDTO from '../Dtos/IFindAllProvidersDTO'

export default interface IUsersRepository {
  findAllProviders(data: IFindAllProvidersDTO): Promise<User[]>
  findById(id: string): Promise<User | undefined>
  findByEmail(email: string): Promise<User | undefined>
  create(data: ICreateUserDTO): Promise<User>
  save(user: User): Promise<User>
}
