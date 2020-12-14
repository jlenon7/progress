/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes/index.ts` as follows
|
| import './cart'
| import './customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import Config from '@ioc:Adonis/Core/Config'

Route.get('/', async () => {
  return {
    name: Config.get('app.name'),
    prefix: Config.get('app.prefix'),
    version: Config.get('app.version'),
    greeting: Config.get('app.greeting'),
  }
})

Route.group(() => {
  Route.get('/', async () => {
    return {
      name: Config.get('app.name'),
      prefix: Config.get('app.prefix'),
      version: Config.get('app.version'),
      greeting: Config.get('app.greeting'),
    }
  })

  Route.group(() => {
    Route.get('/auth/me', 'AuthController.me')
    Route.post('/auth/logout', 'AuthController.logout')

    Route.get('/users', 'UserController.index').middleware('is:admin,manager')
    Route.get('/users/:id', 'UserController.show').middleware('is:admin,manager')
    Route.delete('/users/:id', 'UserController.delete')
  }).middleware('auth')

  Route.group(() => {
    Route.post('/login', 'AuthController.login')
    Route.post('/reset', 'AuthController.reset')
    Route.post('/forgot', 'AuthController.forgot')
    Route.post('/confirm', 'AuthController.confirm')
    Route.post('/register', 'AuthController.register')
  }).prefix('/auth')
}).prefix(Config.get('app.prefix'))
