import User from '../models/user.entity'
import { NotFoundException } from '@nestjs/common'
import { EntityRepository, Repository } from 'typeorm'
import CreateUserDto from '../resolvers/dto/create.user.dto'

@EntityRepository(User)
export default class UserRepository extends Repository<User> {
  public async getUsers(): Promise<User[]> {
    return this.find()
  }

  public async getUser(id: string): Promise<User> {
    const user = await this.findOne(id)

    if (!user) {
      throw new NotFoundException(
        'USER_NOT_FOUND_ID',
        'User not found with this id',
      )
    }

    return user
  }

  public async getUserByEmail(email: string): Promise<User> {
    const user = await this.findOne({ where: { email } })

    if (!user) {
      throw new NotFoundException(
        'USER_NOT_FOUND_EMAIL',
        'User not found with this email',
      )
    }

    return user
  }

  public async createUser(dto: CreateUserDto): Promise<User> {
    const user = await this.create(dto)

    return this.storage(user)
  }

  public async storage(user: User): Promise<User> {
    return this.save(user)
  }
}
