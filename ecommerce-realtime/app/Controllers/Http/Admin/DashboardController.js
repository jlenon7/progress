'use strict'

const db = USE('Database')
class DashboardController {
  async index({ response }) {
    const users = await db.from('users').getCount()
    const orders = await db.from('orders').getCount()
    const products = await db.from('products').getCount()
    const subtotal = await db.from('order_items').getSum('subtotal')
    const discounts = await db.from('coupon_order').getSum('discount')

    const revenues = subtotal - discounts

    return response.json({ users, revenues, orders, products })
  }
}

module.exports = DashboardController
