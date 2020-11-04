import app from '../config/app'
import mail from '../config/mail'
import view from '../config/view'
import swagger from '../config/swagger'
import graphql from '../config/graphql'
import database from '../config/database'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { GraphQLModule } from '@nestjs/graphql'
import { PassportModule } from '@nestjs/passport'
import { MailerModule } from '@nestjs-modules/mailer'

const configuration = () => ({
  app,
  mail,
  view,
  swagger,
  graphql,
  database,
})

export default [
  MailerModule.forRoot(mail),
  GraphQLModule.forRoot(graphql),
  TypeOrmModule.forFeature(database.orm),
  TypeOrmModule.forRoot(database.connection),
  ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
  JwtModule.register({
    secret: app.authorization.jwt.secret,
    signOptions: app.authorization.jwt.signOptions,
  }),
  PassportModule.register({ defaultStrategy: app.authorization.strategy }),
]
