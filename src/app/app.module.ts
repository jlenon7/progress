import { Module } from '@nestjs/common'
import kernel from '../config/kernel'
import HashService from './services/hash.service'
import { PassportModule } from '@nestjs/passport'
import AuthResolver from './resolvers/auth.resolver'
import UserResolver from './resolvers/user.resolver'
import AuthUserService from './services/auth.user.service'
import CreateUserService from './services/create.user.service'
import UpdateUserService from './services/update.user.service'
import DeleteUserService from './services/delete.user.service'
import ConfirmUserService from './services/confirm.user.service'
import ResetPasswordUserService from './services/reset.password.user.service'
import SendForgotUserService from './services/send.forgot.user.service'

@Module({
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  imports: [...kernel],
  providers: [
    UserResolver,
    AuthResolver,
    HashService,
    AuthUserService,
    CreateUserService,
    UpdateUserService,
    DeleteUserService,
    ConfirmUserService,
    SendForgotUserService,
    ResetPasswordUserService,
  ],
  exports: [PassportModule],
})
export default class AppModule {}
