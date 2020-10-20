import { ModuleRef } from '@nestjs/core'
import User from '../models/user.entity'
import HashService from '../../services/hash.service'
import UserRepository from '../repositories/user.repository'
import UpdateUserDto from '../resolvers/dto/update.user.dto'
import {
  Injectable,
  NotFoundException,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common'

@Injectable()
export default class UpdateUserService {
  private hashService: HashService

  constructor(
    private moduleRef: ModuleRef,
    private userRepository: UserRepository,
  ) {
    this.hashService = this.moduleRef.get(HashService, { strict: false })
  }

  public async execute(id: string, dto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.getUser(id)

    if (!user) {
      throw new NotFoundException('USER_NOT_FOUND', 'User not found!')
    }

    const verifyEmail = await this.userRepository.getUserByEmail(dto.email)

    if (verifyEmail) {
      throw new UnauthorizedException(
        'EMAIL_ALREADY_IN_USE',
        'This e-mail is already in use!',
      )
    }

    user.name = dto.name
    user.email = dto.email

    if (dto.password && dto.old_password) {
      const checkOldPassword = await this.hashService.compareHash(
        dto.old_password,
        user.password,
      )

      if (!checkOldPassword) {
        throw new BadRequestException(
          'PASSWORD_DONT_MATCH',
          'Password and old password does not have the same HASH!',
        )
      }

      user.password = await this.hashService.generateHash(dto.password)
    }

    return this.userRepository.storage(user)
  }
}
