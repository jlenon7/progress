import * as path from 'path'
import Env from '@secjs/env'

import { UserRepository } from '../app/Repositories/UserRepository'
import { UserTokenRepository } from '../app/Repositories/UserTokenRepository'

const configurations = {
  /*
      |--------------------------------------------------------------------------
      | Default Connection
      |--------------------------------------------------------------------------
      |
      | Connection defines the default connection settings to be used while
      | interacting with SQL databases.
      |
      */
  connection: Env('DB_CONNECTION', 'sqlite'),

  /*
      |--------------------------------------------------------------------------
      | Sqlite
      |--------------------------------------------------------------------------
      |
      | Sqlite is a flat file database and can be a good choice for a development
      | environment.
      |
      | npm i --save sqlite3
      |
      */
  sqlite: {
    connection: {
      type: 'sqlite',
      database: `src/database/${Env('DB_DATABASE', 'database')}.sqlite`,
      logging: Env('DB_DEBUG', false),
      entities: [path.resolve(__dirname, '..', 'app', 'Models', '*')],
      migrations: [
        path.resolve(__dirname, '..', 'database', 'migrations', '*'),
      ],
    },
    orm: [UserRepository, UserTokenRepository],
  },

  /*
      |--------------------------------------------------------------------------
      | MySQL
      |--------------------------------------------------------------------------
      |
      | Here we define connection settings for MySQL database.
      |
      | npm i --save mysql
      |
      */
  mysql: {
    connection: {
      type: 'mysql',
      database: Env('DB_DATABASE', ''),
      host: Env('DB_HOST', 'localhost'),
      port: Env('DB_PORT', '5432'),
      username: Env('DB_USERNAME', 'root'),
      password: Env('DB_PASSWORD', 'root'),
      synchronize: Env('DB_SYNC', true),
      logging: Env('DB_DEBUG', false),
      entities: [path.resolve(__dirname, '..', 'app', 'Models', '*')],
      migrations: [
        path.resolve(__dirname, '..', 'database', 'migrations', '*'),
      ],
    },
    orm: [UserRepository, UserTokenRepository],
  },

  /*
      |--------------------------------------------------------------------------
      | PostgreSQL
      |--------------------------------------------------------------------------
      |
      | Here we define connection settings for PostgreSQL database.
      |
      | npm i --save pg
      |
      */
  postgres: {
    connection: {
      type: 'postgres',
      database: Env('DB_DATABASE', ''),
      host: Env('DB_HOST', 'localhost'),
      port: Env('DB_PORT', '5432'),
      username: Env('DB_USERNAME', 'root'),
      password: Env('DB_PASSWORD', 'root'),
      synchronize: Env('DB_SYNC', true),
      logging: Env('DB_DEBUG', false),
      entities: [path.resolve(__dirname, '..', 'app', 'Models', '*')],
      migrations: [
        path.resolve(__dirname, '..', 'database', 'migrations', '*'),
      ],
    },
    orm: [UserRepository, UserTokenRepository],
  },
}

const orm = configurations[configurations.connection].orm
const connection = configurations[configurations.connection].connection

export default {
  orm,
  connection,
}
