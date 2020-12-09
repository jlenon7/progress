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
    Route.get('/me', 'AuthController.me')
    Route.post('/logout', 'AuthController.logout')

    Route.get('/users', 'UserController.index')
    Route.get('/users/:id', 'UserController.show')
    Route.delete('/users/:id', 'UserController.delete')
  }).middleware('auth')

  Route.post('/login', 'AuthController.login')
  Route.post('/register', 'AuthController.register')
}).prefix(Config.get('app.prefix'))
