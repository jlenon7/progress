import kernel from '../config/kernel'
import { Module } from '@nestjs/common'
import UserModule from './users/user.module'
import HashService from './services/hash.service'

@Module({
  imports: [kernel.env, kernel.mail, kernel.database, UserModule],
  providers: [HashService],
  exports: [HashService],
})
export default class AppModule {}
