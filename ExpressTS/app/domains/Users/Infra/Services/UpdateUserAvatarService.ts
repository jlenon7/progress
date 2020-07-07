import User from '@Domain/Users/Infra/Entities/User'
import path from 'path'
import AppError from '@Exceptions/AppError'
import IUsersRepository from '@Domain/Users/Infra/Repositories/IUsersRepository'

import fs from 'fs'

import uploadConfig from '@Config/upload'

interface IRequest {
  user_id: string
  avatarFilename: string
}

class UpdateUserAvatarService {
  constructor(private usersRepository: IUsersRepository) {}

  public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id)

    if (!user) {
      throw new AppError('Only authenticated users can change avatar.', 401)
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar)
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath)

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath)
      }
    }

    user.avatar = avatarFilename

    await this.usersRepository.save(user)

    return user
  }
}

export default UpdateUserAvatarService
