import Env from '@secjs/env'
import * as packageJson from '../package.json'

export default {
  /*
  |--------------------------------------------------------------------------
  | Application Env
  |--------------------------------------------------------------------------
  |
  | This value defines the environment of the API.
  |
  */
  env: Env('NODE_ENV', 'local'),

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

  name: Env('APP_NAME', 'UserAPI'),

  /*
  |--------------------------------------------------------------------------
  | Application Description
  |--------------------------------------------------------------------------
  |
  | This value is the description of your application and can used when you
  | need to place the application's description in swagger, view or
  | other location.
  |
  */

  description: Env('APP_DESCRIPTION', 'Users Open API on Swagger'),

  /*
  |--------------------------------------------------------------------------
  | Application host
  |--------------------------------------------------------------------------
  |
  | This value is the HOST of your application and its used to access your
  | application.
  |
  */

  host: Env('HOST', '127.0.0.1'),

  /*
  |--------------------------------------------------------------------------
  | Application port
  |--------------------------------------------------------------------------
  |
  | This value is the PORT of your application and its used to access your
  | application.
  |
  */

  port: Env('PORT', 3000),

  /*
  |--------------------------------------------------------------------------
  | Application prefix
  |--------------------------------------------------------------------------
  |
  | This value is the prefix of your application and can used when you
  | need to place the application's prefix in a route, view or
  | other location.
  |
  */

  prefix: Env('APP_PREFIX', '/users'),

  /*
  |--------------------------------------------------------------------------
  | Application debug
  |--------------------------------------------------------------------------
  |
  | This value defines if will debug the application with logs or not.
  |
  */

  api_debug: Env('APP_DEBUG', false),

  /*
  |--------------------------------------------------------------------------
  | Application Version
  |--------------------------------------------------------------------------
  |
  | This value is the version of your application and can used when you
  | need to place the application's version in a route, view or
  | other location.
  |
  */
  version: packageJson.version,

  /*
  |--------------------------------------------------------------------------
  | Default Locale
  |--------------------------------------------------------------------------
  |
  | Default locale to be used by Antl provider. You can always switch drivers
  | in runtime or use the official Antl middleware to detect the driver
  | based on HTTP headers/query string.
  |
  */
  locale: Env('APP_LOCALE', 'pt'),

  /*
  |--------------------------------------------------------------------------
  | Authorization strategies
  |--------------------------------------------------------------------------
  |
  | This values defines the authorization strategy that the API is going to
  | use.
  |
  */
  authorization: {
    strategy: 'jwt',
    jwt: {
      secret: Env(
        'APP_KEY',
        'PA3g5Q3ExCOHwlD5UYvnuowyMgu3VARvT82Sw0Y3FxXUSbCYB0LenAAlg65IMg6H',
      ),
      signOptions: {
        expiresIn: 18000,
      },
    },
  },
}
