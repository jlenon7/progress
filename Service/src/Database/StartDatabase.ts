import knex from 'knex'
import path from 'path'

export let Connection: knex<any, unknown[]>
export default class StartDatabase {
  public SQLite3(): knex {
    return Connection = knex({
      client: 'sqlite3',
      connection: {
        filename: path.resolve(__dirname, 'database.sqlite')
      },
      useNullAsDefault: true,
    })
  }

  public PostgreSQL(): knex {
    return Connection = knex({
      client: 'postgres',
      connection: {
        host: '127.0.0.1',
        port: 5433,
        user: 'postgres',
        password: 'docker',
        database: 'postgres',
      },
      useNullAsDefault: true,
    })
  }
}
