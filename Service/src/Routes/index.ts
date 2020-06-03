import { Router, Request, Response } from 'express'

class Welcome {
  public router: Router

  constructor() {
    this.router = Router()
    this.SetupWelcomeRoute()
  }

  public SetupWelcomeRoute(): any {
    this.router.get('/', (request: Request, response: Response) => {
      return response.json({
       zap: 'nu dale 😎👋'
      })
    })
  }
}

export default new Welcome().router
