import { Router } from 'express'
import PointsController from '@App/Controllers/PointsController'

class Points {
  public router: Router
  public Controller: PointsController

  constructor() {
    this.Controller = new PointsController
    this.router = Router()
    this.SetupPointsRoutes()
  }

  public SetupPointsRoutes(): any {
    this.router.post('/points', this.Controller.store)
    this.router.get('/points/:id', this.Controller.show)
    this.router.get('/points', this.Controller.index)
  }
}

export default new Points().router
