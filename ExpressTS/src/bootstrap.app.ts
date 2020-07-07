import 'reflect-metadata'
import 'express-async-errors'
import '@Start/env'

import cors from 'cors'

import Routes from '@Start/routes'
import appConfig from '@Config/app'
import Application from '@Start/app'
import corsConfig from '@Config/cors'
import Connection from '@Database/connection'

export default new Application({
  middlewares: [
    cors(corsConfig),
  ],
  routes: [
    Routes
  ],
  port: 3333,
  database: new Connection(),
  name: appConfig.name,
  prefix: appConfig.prefix
})