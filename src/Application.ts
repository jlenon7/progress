import express, { Application as ExpressApp } from 'express'
import IApplication from './Interfaces/IApplication'

class Application implements IApplication {
  public app: ExpressApp
  private port: number
  private middlewares: any[]
  private routes: any[]

  constructor(configs: { middlewares: any[]; routes: any[]; port: number; }) {
    this.app = express()
    this.port = configs.port
    this.routes = configs.routes
    this.middlewares = configs.middlewares
    this.StartApplication()
  }

  public async StartApplication(): Promise<void> {
    this.RunExpressServer()
    this.RunDatabaseCluster
  }
  public async StopApplication(): Promise<void> {
    console.log('> [APP] Stopping the application')
  }

  private async RunExpressServer(): Promise<void> {
    this.app.use(express.json())
    await this.BootMiddlewares(this.middlewares)
    await this.BootRoutes(this.routes)
    this.app.listen(this.port, () => console.log(`🚀 NLW started on port ${this.port}! 🤯`))
  }

  private RunDatabaseCluster(): void {
    console.log('> [APP] Running Database Cluster')
  }

  private async BootMiddlewares (middlewares: any[]): Promise<void> {
    middlewares.forEach((middleware: any) => {
      this.app.use(middleware)
    })
  }

  private async BootRoutes (routes: any[]): Promise<void> {
    routes.forEach((route: any) => {
      this.app.use(route)
    })
  }
}

export default Application

