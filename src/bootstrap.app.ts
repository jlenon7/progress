import { config as configDotenv } from 'dotenv'
import { resolve } from 'path'

import Application from './Application'
import cors from 'cors'

import logMiddleware from './Middlewares/log.middleware'
import routes from './Routes'

configDotenv({
  path: resolve(__dirname, '../.env')
})

const app = new Application({
  middlewares: [
    cors(),
    logMiddleware
  ],
  routes: [
    routes
  ],
  port: 3333,
})

export default app.app