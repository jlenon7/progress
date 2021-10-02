import Env from '@secjs/env'

export default {
  /*
  |--------------------------------------------------------------------------
  | Schema file
  |--------------------------------------------------------------------------
  |
  | This values defines the name of the schema file for GQL.
  |
  */
  autoSchemaFile: Env('GQL_SCHEMA', 'schema.gql'),

  /*
  |--------------------------------------------------------------------------
  | GQL Playground
  |--------------------------------------------------------------------------
  |
  | This values defines if you the API will use GQL Playground or not.
  |
  */
  playground: Env('GQL_PLAYGROUND', false),

  /*
  |--------------------------------------------------------------------------
  | GQL Context
  |--------------------------------------------------------------------------
  |
  | This values defines the parameters of all requests contexts of GQL.
  |
  */
  context: ({ req }): any => ({ headers: req.headers }),
}
