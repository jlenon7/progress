import * as path from 'path'
import Env from '../utils/EnvGet'

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
  connection: Env.get('DB_CONNECTION', 'sqlite'),

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
      database: `src/database/${Env.get('DB_DATABASE', 'database')}.sqlite`,
      logging: Env.get('DB_DEBUG', false),
      entities: [path.resolve(__dirname, '..', 'app', 'users', 'models', '*')],
      migrations: [
        path.resolve(__dirname, '..', 'database', 'migrations', '*'),
      ],
    },
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
      database: Env.get('DB_DATABASE', 'adonis'),
      host: Env.get('DB_HOST', 'localhost'),
      port: Env.get('DB_PORT', '5432'),
      username: Env.get('DB_USERNAME', 'root'),
      password: Env.get('DB_PASSWORD', 'root'),
      synchronize: Env.get('DB_SYNC', true),
      logging: Env.get('DB_DEBUG', false),
      entities: [path.resolve(__dirname, '..', 'app', 'users', 'models', '*')],
      migrations: [
        path.resolve(__dirname, '..', 'database', 'migrations', '*'),
      ],
    },
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
      database: Env.get('DB_DATABASE', 'adonis'),
      host: Env.get('DB_HOST', 'localhost'),
      port: Env.get('DB_PORT', '5432'),
      username: Env.get('DB_USERNAME', 'root'),
      password: Env.get('DB_PASSWORD', 'root'),
      synchronize: Env.get('DB_SYNC', true),
      logging: Env.get('DB_DEBUG', false),
      entities: [path.resolve(__dirname, '..', 'app', 'users', 'models', '*')],
      migrations: [
        path.resolve(__dirname, '..', 'database', 'migrations', '*'),
      ],
    },
  },
}

module.exports = configurations[configurations.connection].connection
