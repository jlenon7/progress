'use strict'

class AdminCategoryStoreOrder {
  get rules() {
    return {
      // validation rules
      'items.*.product_id': 'exists:products,id',
      'items.*.quantity': 'min:1',
    }
  }
}

module.exports = AdminCategoryStoreOrder
