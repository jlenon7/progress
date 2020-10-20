import Env from '../utils/EnvGet'

export default {
  /*
    |--------------------------------------------------------------------------
    | Application Name
    |--------------------------------------------------------------------------
    |
    | This value is the name of your application and can used when you
    | need to place the application's name in a email, view or
    | other location.
    |
    */
  env: Env.get('NODE_ENV', 'local'),
  name: Env.get('APP_NAME', 'UserAPI'),
  api_debug: Env.get('API_DEBUG', false),

  /*
    |--------------------------------------------------------------------------
    | Prefix
    |--------------------------------------------------------------------------
    |
    | App prefix is the prefix that is going to be used in routes
    |
    */
  prefix: Env.get('APP_PREFIX', '/users'),

  /*
    |--------------------------------------------------------------------------
    | App Key
    |--------------------------------------------------------------------------
    |
    | App key is a randomly generated 16 or 32 characters long string required
    | to encrypt cookies, sessions and other sensitive data.
    |
    */
  appKey: Env.get('APP_KEY'),

  /*
    |--------------------------------------------------------------------------
    | Authentication Passport
    |--------------------------------------------------------------------------
    |
    | Authentication passport that the application will use to authenticate
    | users.
    |
    */
  passport: { defaultStrategy: 'jwt' },
}
