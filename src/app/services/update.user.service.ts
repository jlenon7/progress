import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common'
import User from '../models/user.entity'
import HashService from './hash.service'
import UserRepository from '../repositories/user.repository'
import UpdateUserDto from '../resolvers/dto/update.user.dto'

@Injectable()
export default class UpdateUserService {
  constructor(
    private hashService: HashService,
    private userRepository: UserRepository,
  ) {}

  public async execute(id: string, dto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.getUser(id)

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
