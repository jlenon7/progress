import Application from 'Application'
import cors from 'cors'

import logMiddleware from '@App/Middlewares/log.middleware'

import Welcome from '@App/Routes'
import Files from '@App/Routes/files.routes'
import Items from '@App/Routes/items.routes'

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