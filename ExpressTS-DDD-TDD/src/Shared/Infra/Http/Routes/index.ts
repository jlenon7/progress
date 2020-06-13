import { Router } from 'express'

import sessionsRouter from '@Modules/Users/Infra/Http/Routes/sessions.routes'
import usersRouter from '@Modules/Users/Infra/Http/Routes/users.routes'

class Routes {
  public router: Router

  constructor() {
    this.router = Router()
    this.SetupRoutes()
  }

  public SetupRoutes(): any {
    this.router.use('/sessions', sessionsRouter)
    this.router.use('/users', usersRouter)
  }
}

export default new Routes().router

