import UserToken from '../models/user.token.entity'
import { EntityRepository, Repository } from 'typeorm'
import CreateUserTokenDto from '../resolvers/dto/create.user.token.dto'

@EntityRepository(UserToken)
export default class UserTokenRepository extends Repository<UserToken> {
  public async createUserToken(dto: CreateUserTokenDto): Promise<UserToken> {
    const userToken = await this.create(dto)

    return this.storage(userToken)
  }

  public async storage(userToken: UserToken): Promise<UserToken> {
    return this.save(userToken)
  }
}
