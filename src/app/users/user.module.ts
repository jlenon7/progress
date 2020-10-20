import kernel from '../../config/kernel'
import { Module } from '@nestjs/common'

import { PassportModule } from '@nestjs/passport'
import AuthResolver from './resolvers/auth.resolver'
import UserResolver from './resolvers/user.resolver'
import AuthUserService from './services/auth.user.service'
import CreateUserService from './services/create.user.service'
import UpdateUserService from './services/update.user.service'
import DeleteUserService from './services/delete.user.service'

@Module({
  imports: [kernel.jwt, kernel.orm, kernel.graphql, kernel.passport],
  providers: [
    UserResolver,
    AuthResolver,
    AuthUserService,
    CreateUserService,
    UpdateUserService,
    DeleteUserService,
  ],
  exports: [PassportModule],
})
export default class UserModule {}
