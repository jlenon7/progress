import { Injectable } from '@nestjs/common'
import StatusEnum from '../../database/ENUM/status.enum'
import UserRepository from '../repositories/user.repository'

@Injectable()
export default class DeleteUserService {
  constructor(private userRepository: UserRepository) {}

  public async execute(id: string): Promise<void> {
    const user = await this.userRepository.getUser(id)

    user.status = StatusEnum.DELETED
    user.deleted_at = new Date()

    await this.userRepository.storage(user)
  }
}
