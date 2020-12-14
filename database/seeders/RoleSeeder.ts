import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { Role, Permission } from 'App/Models'

export default class RoleSeederSeeder extends BaseSeeder {
  public async run() {
    const roleAdmin = await Role.create({
      name: 'Admin',
      slug: 'admin',
      description: 'System Administrator',
    })

    const permListUsers = await Permission.findByOrFail('slug', 'list_users')
    const permShowUsers = await Permission.findByOrFail('slug', 'show_users')
    const permUpdateUsers = await Permission.findByOrFail('slug', 'update_users')
    const permDeleteUsers = await Permission.findByOrFail('slug', 'delete_users')
    const permCreateUsers = await Permission.findByOrFail('slug', 'create_users')

    if (roleAdmin) {
      await roleAdmin
        .related('permissions')
        .attach([
          permListUsers.id,
          permShowUsers.id,
          permUpdateUsers.id,
          permDeleteUsers.id,
          permCreateUsers.id,
        ])
    }

    const roleManager = await Role.create({
      name: 'Manager',
      slug: 'manager',
      description: 'System Manager',
    })

    if (roleManager) {
      await roleManager
        .related('permissions')
        .attach([
          permListUsers.id,
          permShowUsers.id,
          permUpdateUsers.id,
          permDeleteUsers.id,
          permCreateUsers.id,
        ])
    }

    const roleCustomer = await Role.create({
      name: 'Customer',
      slug: 'customer',
      description: 'System Customer',
    })

    if (roleCustomer) {
      await roleCustomer
        .related('permissions')
        .attach([permShowUsers.id, permUpdateUsers.id, permDeleteUsers.id])
    }

    const roleSeller = await Role.create({
      name: 'Seller',
      slug: 'seller',
      description: 'System Seller',
    })

    if (roleSeller) {
      await roleSeller
        .related('permissions')
        .attach([permShowUsers.id, permUpdateUsers.id, permDeleteUsers.id])
    }

    const roleDriver = await Role.create({
      name: 'Driver',
      slug: 'driver',
      description: 'System Driver',
    })

    if (roleDriver) {
      await roleDriver
        .related('permissions')
        .attach([permShowUsers.id, permUpdateUsers.id, permDeleteUsers.id])
    }
  }
}
