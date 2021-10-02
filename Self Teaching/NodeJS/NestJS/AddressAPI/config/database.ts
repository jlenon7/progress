import Env from '@secjs/env'

import { Address, AddressSchema } from 'app/Schemas/Address'

const schemasPath = [{ name: Address.name, schema: AddressSchema }]

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
  | MongoDb
  |--------------------------------------------------------------------------
  |
  | Here we define connection settings for Mongo database.
  |
  | npm i --save mongoose
  |
  */
  mongo: {
    connection: {
      url: `mongodb+srv://${Env('DB_USERNAME', 'root')}:${Env(
        'DB_PASSWORD',
        'root',
      )}@${Env('DB_HOST', '@cluster0.aejvg.mongodb.net')}/${Env(
        'DB_DATABASE',
        'mongodb',
      )}?retryWrites=true&w=majority`,
      options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    },
    schemas: schemasPath,
  },
}

const connection = configurations[configurations.connection].connection
const schemas = configurations[configurations.connection].schemas

export default { connection, schemas }