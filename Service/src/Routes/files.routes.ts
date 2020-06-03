import express, { Router, Request, Response } from 'express'
import FilesController from '../Controllers/FilesController'

class Files {
  public router: Router
  public Controller: FilesController

  constructor() {
    this.Controller = new FilesController
    this.router = Router()
    this.SetupFilesRoutes()
  }

  public SetupFilesRoutes(): any {
    this.router.use('/files', this.Controller.show())
  }
}

export default new Files().router
