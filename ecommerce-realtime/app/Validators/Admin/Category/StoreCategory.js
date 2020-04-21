'use strict'

class AdminCategoryStoreCategory {
  get rules() {
    return {
      // validation rules
      title: 'required',
      description: 'description',
    }
  }
}

module.exports = AdminCategoryStoreCategory
