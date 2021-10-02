import kernel from '../start/kernel'
import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'

import { AuthService } from './Services/AuthService'
import { UserService } from './Services/UserService'
import { HashService } from './Services/HashService'

import { AuthResolver } from './Http/Resolvers/AuthResolver'
import { UserResolver } from './Http/Resolvers/UserResolver'

@Module({
  imports: [...kernel],
  providers: [
    HashService,
    AuthService,
    UserService,
    AuthResolver,
    UserResolver,
  ],
  exports: [PassportModule],
})
export default class AppModule {}
