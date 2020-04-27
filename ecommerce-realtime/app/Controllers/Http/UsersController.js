'use strict'
const UserTransformer = use('App/Transformer/Admin/UserTransformer')
class UsersController {
  async me({ response, transform, auth }) {
    var user = await auth.getUser()
    const userData = await transform.item(user, UserTransformer)

    userData.roles = await user.getRoles()

    return response.json(userData)
  }
}

module.exports = UsersController
