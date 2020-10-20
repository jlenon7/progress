import app from './app'
import jwt from './jwt'
import orm from './orm'
import mail from './mail'
import graphql from './graphql'
import * as database from './database'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { GraphQLModule } from '@nestjs/graphql'
import { PassportModule } from '@nestjs/passport'
import { MailerModule } from '@nestjs-modules/mailer'

const config = { isGlobal: true }

export default {
  jwt: JwtModule.register(jwt),
  mail: MailerModule.forRoot(mail),
  env: ConfigModule.forRoot(config),
  orm: TypeOrmModule.forFeature(orm),
  graphql: GraphQLModule.forRoot(graphql),
  database: TypeOrmModule.forRoot(database),
  passport: PassportModule.register(app.passport),
}
