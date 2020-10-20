import User from '../models/user.entity'
import { EntityRepository, Repository } from 'typeorm'
import CreateUserDto from '../resolvers/dto/create.user.dto'

@EntityRepository(User)
export default class UserRepository extends Repository<User> {
  public async getUsers(): Promise<User[]> {
    return this.find()
  }

  public async getUser(id: string): Promise<User> {
    return this.findOne(id)
  }

  public async getUserByEmail(email: string): Promise<User> {
    return this.findOne({ where: { email } })
  }

  public async createUser(dto: CreateUserDto): Promise<User> {
    const user = await this.create(dto)

    return this.storage(user)
  }

  public async storage(user: User): Promise<User> {
    return this.save(user)
  }
}
