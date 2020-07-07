import { Router } from 'express'
import appConfig from '@Config/app'

import sessionsRouter from '@Domain/Users/Infra/Routes/sessions.routes'
import usersRouter from '@Domain/Users/Infra/Routes/users.routes'

class Routes {
  public router: Router

  constructor() {
    this.router = Router()
    this.SetupRoutes()
  }

  public SetupRoutes(): any {
    const welcome = () => {
      return {
        greeting: `Welcome to ${appConfig.name} API!`,
        version: appConfig.version,
      }
    }

    this.router.use('/', welcome)
    this.router.use('/sessions', sessionsRouter)
    this.router.use('/users', usersRouter)
  }
}

export default new Routes().router

