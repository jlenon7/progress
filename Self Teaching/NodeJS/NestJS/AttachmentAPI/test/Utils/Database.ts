import { App } from 'test/Utils'
import { Connection } from 'mongoose'

export default class Database {
  private app: App
  private connection: Connection

  constructor(app: App) {
    this.app = app
    this.connection = this.getConnection()
  }

  getConnection() {
    return this.app.getInstance<Connection>('DatabaseConnection')
  }

  getRepository<Repository>(repository: any) {
    return this.app.getInstance<Repository>(repository.name)
  }

  async closeConnection() {
    await this.connection.close()
  }

  async truncate() {
    const promises = []

    const collections = await this.connection.db.collections()

    collections.forEach(collection => {
      promises.push(collection.deleteMany({}))
    })

    await Promise.all(promises)
  }

  async dropDatabase() {
    await this.connection.db.dropDatabase()
  }

  async dropCollections(collections: string[]) {
    const promises = []

    collections.forEach(collection => {
      promises.push(this.connection.collections[collection].drop())
    })

    await Promise.all(promises)
  }
}
