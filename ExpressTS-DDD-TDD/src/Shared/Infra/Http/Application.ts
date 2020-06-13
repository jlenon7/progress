import express, { Application as ExpressApp } from 'express'
import UploadConfig from '@Config/Upload'
import DatabaseOptions from '@Config/DatabaseOptions'

class Application {
  public app: ExpressApp
  private port: number
  private middlewares: any[]
  private routes: any[]
  private database: string

  constructor(configs: { middlewares: any[]; routes: any[]; port: number; database: string }) {
    this.app = express()
    this.port = configs.port
    this.routes = configs.routes
    this.database = configs.database
    this.middlewares = configs.middlewares
    this.StartApplication()
  }

  public async StartApplication(): Promise<void> {
    this.RunExpressServer()
    this.RunDatabaseCluster()
  }
  
  public async StopApplication(): Promise<void> {
    console.log('> [APP] Stopping the application')
  }

  private async RunExpressServer(): Promise<void> {
    this.app.use(express.json())
    await this.BootMiddlewares(this.middlewares)
    await this.BootRoutes(this.routes)
    this.app.listen(this.port, () => console.log(`🚀 API started on port ${this.port}! 🤯`))
  }

  private RunDatabaseCluster(): void {
    new DatabaseOptions(this.database)
  }

  private async BootMiddlewares (middlewares: any[]): Promise<void> {
    middlewares.forEach((middleware: any) => {
      this.app.use(middleware)
    })
  }

  private async BootRoutes (routes: any[]): Promise<void> {
    routes.forEach((route: any) => {
      this.app.use('/api/v1', route)
    })
    this.app.use('/files', express.static(UploadConfig.directory))
  }
}

export default Application

