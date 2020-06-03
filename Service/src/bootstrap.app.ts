import { config as configDotenv } from 'dotenv'
import { resolve } from 'path'

import Application from './Application'
import cors from 'cors'

import logMiddleware from './Middlewares/log.middleware'
import Welcome from './Routes'
import Files from './Routes/files.routes'
import Items from './Routes/items.routes'

configDotenv({
  path: resolve(__dirname, '../.env')
})

const app = new Application({
  middlewares: [
    cors(),
    logMiddleware
  ],
  routes: [
    Welcome,
    Files,
    Items
  ],
  port: 3333,
  database: 'postgres'
})

export default app.app