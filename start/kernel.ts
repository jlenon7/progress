import app from '../config/app'
import cors from '../config/cors'
import database from '../config/database'

import { JwtModule } from '@nestjs/jwt'
import { ConfigModule } from '@nestjs/config'
import { PassportModule } from '@nestjs/passport'
import { MongooseModule } from '@nestjs/mongoose'

const configuration = () => ({
  app,
  cors,
  database,
})

const envFilePath = `.env.${process.env.NODE_ENV}`

const kernel = [
  ConfigModule.forRoot({
    envFilePath,
    isGlobal: true,
    load: [configuration],
  }),
  MongooseModule.forFeature(database.schemas),
  MongooseModule.forRoot(database.connection.url),
  JwtModule.register(app.authorization[app.authorization.strategy]),
  PassportModule.register({ defaultStrategy: app.authorization.strategy }),
]

export default kernel
