import kernel from '../config/kernel'
import { Module } from '@nestjs/common'
import UserModule from './users/user.module'

@Module({
  imports: [kernel.env, kernel.mail, kernel.database, UserModule],
})
export default class AppModule {}
