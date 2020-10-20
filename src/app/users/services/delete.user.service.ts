import StatusEnum from '../../../database/ENUM/status.enum'
import UserRepository from '../repositories/user.repository'
import { Injectable, NotFoundException } from '@nestjs/common'

@Injectable()
export default class DeleteUserService {
  constructor(private userRepository: UserRepository) {}

  public async execute(id: string): Promise<void> {
    const user = await this.userRepository.getUser(id)

    if (!user) {
      throw new NotFoundException('USER_NOT_FOUND', 'User not found!')
    }

    user.status = StatusEnum.DELETED
    user.deleted_at = new Date()

    await this.userRepository.storage(user)
  }
}
