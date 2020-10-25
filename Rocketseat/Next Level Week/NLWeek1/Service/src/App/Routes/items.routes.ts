import { Router } from 'express'
import ItemsController from '@App/Controllers/ItemsController'

class Items {
  public router: Router
  public Controller: ItemsController

  constructor() {
    this.Controller = new ItemsController
    this.router = Router()
    this.SetupItemsRoutes()
  }

  public SetupItemsRoutes(): any {
    this.router.get('/items', this.Controller.index)
  }
}

export default new Items().router
