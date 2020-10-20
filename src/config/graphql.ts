export default {
  /*
    |--------------------------------------------------------------------------
    | GraphQL
    |--------------------------------------------------------------------------
    |
    | Here we define the configurations to GraphQL.
    |
    */
  autoSchemaFile: 'schema.gql',
  playground: true,
  context: ({ req }): any => ({ headers: req.headers }),
}
