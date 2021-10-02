import Env from '@secjs/env'
import * as packageJson from '../package.json'

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

  name: Env('APP_NAME', 'NestJS'),

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

  description: Env('APP_DESCRIPTION', 'NestJS Framework'),

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

  prefix: Env('APP_PREFIX', '/srv'),

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
  | Default enviroment
  |--------------------------------------------------------------------------
  |
  | Default enviroment of the application.
  |
  */
  enviroment: Env('NODE_ENV', 'development'),

  /*
  |--------------------------------------------------------------------------
  | Default services
  |--------------------------------------------------------------------------
  |
  | Default services token for communication.
  |
  */
  services: {
    application: {
      url: Env('APPLICATION_URL', ''),
      token: Env('APPLICATION_TOKEN', ''),
    },
  },

  /*
  |--------------------------------------------------------------------------
  | Default authorization strategy
  |--------------------------------------------------------------------------
  |
  | Default authorization strategy for the entire application.
  |
  */
  authorization: {
    strategy: 'jwt',
    jwt: {
      secret: Env('APP_KEY', ''),
      signOptions: { expiresIn: 18000 },
    },
  },
}
