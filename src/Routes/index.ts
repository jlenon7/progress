import { Router, Request, Response } from 'express'

class Routes {
  public router = Router()
  public path = process.env.APP_PREFIX

  constructor() {
    this.setupRoutes()
  }

  public setupRoutes(): any {
    this.router.get('/', (request: Request, response: Response) => {
      return response.json({
       zap: 'nu dale 😎👋'
      })
    })
  }
}

export default new Routes().router
