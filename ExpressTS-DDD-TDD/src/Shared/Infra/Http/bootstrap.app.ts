import 'reflect-metadata'
import 'express-async-errors'

import Application from './Application'
import cors from 'cors'

import Routes from '@Shared/Infra/Http/Routes'

const app = new Application({
  middlewares: [
    cors(),
  ],
  routes: [
    Routes
  ],
  port: 3333,
  database: 'typeorm'
})

export default app.app