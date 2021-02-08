/*
|--------------------------------------------------------------------------
| Http Controllers
|--------------------------------------------------------------------------
|
| All Http Controllers of the application.
|
*/
export const httpControllers = [
  require('./Http/WelcomeController').default,
  require('./Http/ApplicationController').default,
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

export const guards = [require('./Http/Guards/TokenGuard').default]

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
