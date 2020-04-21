'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
  // Category Resource
  Route.resource('categories', 'CategoryController')
    .apiOnly()
    .validator(
      new Map([
        [['categories.store'], ['Admin/Category/StoreCategory']],
        [['categories.update'], ['Admin/Category/StoreCategory']],
      ])
    )

  // Coupon Resource
  Route.resource('coupons', 'CouponController').apiOnly()

  // Image Resource
  Route.resource('images', 'ImageController').apiOnly()

  Route.post('orders/:id/discount', 'OrderController.applyDiscount')
  Route.delete('orders/:id/discount', 'OrderController.revemoDiscount')

  // Order Resource
  Route.resource('orders', 'OrderController')
    .apiOnly()
    .validator(new Map([[['orders.store'], ['Admin/Category/StoreOrder']]]))

  // Product Resource
  Route.resource('products', 'ProductController').apiOnly()

  // User Resource
  Route.resource('users', 'UserController')
    .apiOnly()
    .validator(
      new Map([
        [['users.store'], ['Admin/User/StoreUser']],
        [['users.update'], ['Admin/User/StoreUser']],
      ])
    )
})
  .prefix('/api/v1/admin')
  .namespace('Admin')
  .middleware(['auth', 'is:(admin || manager)'])
