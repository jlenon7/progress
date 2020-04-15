'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
  // Category Resource
  Route.resource('categories', 'CategoryController').apiOnly()

  // Coupon Resource
  Route.resource('coupons', 'CouponController').apiOnly()

  // Image Resource
  Route.resource('images', 'ImageController').apiOnly()

  Route.post('orders/:id/discount', 'OrderController.applyDiscount')
  Route.delete('orders/:id/discount', 'OrderController.revemoDiscount')

  // Order Resource
  Route.resource('orders', 'OrderController').apiOnly()

  // Product Resource
  Route.resource('products', 'ProductController').apiOnly()

  // User Resource
  Route.resource('users', 'UserController').apiOnly()
})
  .prefix('/api/v1/admin')
  .namespace('Admin')
  .middleware(['auth', 'is:(admin || manager)'])
