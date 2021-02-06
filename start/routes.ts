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

    Route.resource('applications', 'ApplicationController')
      .apiOnly()
      .middleware({
        index: ['is:admin,manager'],
      })

    Route.resource('applications.contacts', 'ContactController')
      .apiOnly()
      .except(['update'])
      .middleware({
        show: ['resourceOwner'],
        destroy: ['resourceOwner'],
      })

    Route.resource('applications.addresses', 'AddressController')
      .apiOnly()
      .except(['update'])
      .middleware({
        show: ['resourceOwner'],
        destroy: ['resourceOwner'],
      })

    Route.resource('applications.attachments', 'AttachmentController')
      .apiOnly()
      .except(['update'])
      .middleware({
        show: ['resourceOwner'],
        destroy: ['resourceOwner'],
      })
  }).middleware(['auth', 'owner'])

  Route.get('/issues', 'IssueController.index').middleware('auth')

  Route.group(() => {
    Route.post('/login', 'AuthController.login')
    Route.post('/reset', 'AuthController.reset')
    Route.post('/forgot', 'AuthController.forgot')
    Route.post('/confirm', 'AuthController.confirm')
    Route.post('/register', 'AuthController.register')
  }).prefix('/auth')

  Route.get('/get/applications/:token', 'ApplicationController.token')
}).prefix(`${Config.get('app.prefix')}`)
