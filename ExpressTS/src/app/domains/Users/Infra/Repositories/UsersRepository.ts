import User from '@Domain/Users/Infra/Entities/User'
import IUsersRepository from '@Domain/Users/Infra/Repositories/IUsersRepository'
import ICreateUserDTO from '@Domain/Users/DTO/ICreateUserDTO'       

import { getRepository, Repository } from 'typeorm'

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>

  constructor() {
    this.ormRepository = getRepository(User)
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id)

    return user
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(email)

    return user
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(userData);

    await this.ormRepository.save(user)

    return user
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user)
  }
}

export default UsersRepository
