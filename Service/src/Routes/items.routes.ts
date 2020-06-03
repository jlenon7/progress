import { Router } from 'express'
import ItemsController from '../Controllers/ItemsController'

class Items {
  public router: Router
  public Controller: ItemsController

  constructor() {
    this.Controller = new ItemsController
    this.router = Router()
    this.SetupFilesRoutes()
  }

  public SetupFilesRoutes(): any {
    this.router.get('/items', this.Controller.index)
  }
}

export default new Items().router
