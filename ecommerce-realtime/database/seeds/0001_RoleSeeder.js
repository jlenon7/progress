'use strict'

/*
|--------------------------------------------------------------------------
| RoleSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Role = use('Role')

class RoleSeeder {
  async run() {
    // Cria o Admin
    await Role.create({
      name: 'Admin',
      slug: 'admin',
      description: 'Administrador do sistema',
    })

    // Cria o Gerente
    await Role.create({
      name: 'Manager',
      slug: 'manager',
      description: 'Gerente do sistema',
    })

    // Cria o Cliente
    await Role.create({
      name: 'Client',
      slug: 'client',
      description: 'Cliente do sistema',
    })
  }
}

module.exports = RoleSeeder
