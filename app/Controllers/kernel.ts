import { RequestMethod } from '@nestjs/common'

/*
|--------------------------------------------------------------------------
| Http Controllers
|--------------------------------------------------------------------------
|
| All Http Controllers of the application.
|
*/
export const httpControllers = [
  require('./Http/AddressController').default,
  require('./Http/WelcomeController').default,
]

/*
|--------------------------------------------------------------------------
| Collections
|--------------------------------------------------------------------------
|
| All Collections of other applications.
|
*/

export const collections = []

/*
|--------------------------------------------------------------------------
| Middlewares
|--------------------------------------------------------------------------
|
| All Middlewares of the application.
|
*/

export const middlewares = [
  {
    middleware: require('./Middlewares/PaginationMiddleware')
      .PaginationMiddleware,
    routes: [{ path: 'addresses', method: RequestMethod.PATCH }],
  },
]

/*
|--------------------------------------------------------------------------
| Filters
|--------------------------------------------------------------------------
|
| All Filters of the application.
|
*/

export const filters = [require('./Http/Filters/HttpExceptionFilter').default]

/*
|--------------------------------------------------------------------------
| Guards
|--------------------------------------------------------------------------
|
| All type of guards of the application.
|
*/

export const guards = [require('./Http/Guards/AppGuard').default]

/*
|--------------------------------------------------------------------------
| Interceptors
|--------------------------------------------------------------------------
|
| All Interceptors of the application.
|
*/

export const interceptors = [
  require('./Http/Interceptors/ResponseInterceptor').default,
]
