import s3 from '../config/s3'
import app from '../config/app'
import cors from '../config/cors'
import upload from '../config/upload'
import database from '../config/database'

import { JwtModule } from '@nestjs/jwt'
import { ConfigModule } from '@nestjs/config'
import { PassportModule } from '@nestjs/passport'
import { MongooseModule } from '@nestjs/mongoose'
import { MulterModule } from '@nestjs/platform-express'

const configuration = () => ({
  s3,
  app,
  cors,
  upload,
  database,
})

const kernel = [
  MulterModule.registerAsync({ useFactory: async () => upload }),
  MongooseModule.forFeature(database.schemas),
  MongooseModule.forRoot(database.connection.url),
  ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
  JwtModule.register(app.authorization[app.authorization.strategy]),
  PassportModule.register({ defaultStrategy: app.authorization.strategy }),
]

export default kernel
