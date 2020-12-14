import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { Permission } from 'App/Models'

export default class PermissionSeederSeeder extends BaseSeeder {
  public async run() {
    await Permission.create({
      name: 'Create Users',
      slug: 'create_users',
      description: 'Create Users Permission',
    })

    await Permission.create({
      name: 'Update Users',
      slug: 'update_users',
      description: 'Update Users Permission',
    })

    await Permission.create({
      name: 'Show Users',
      slug: 'show_users',
      description: 'Show Users Permission',
    })

    await Permission.create({
      name: 'List Users',
      slug: 'list_users',
      description: 'List Users Permission',
    })

    await Permission.create({
      name: 'Delete Users',
      slug: 'delete_users',
      description: 'Delete Users Permission',
    })
  }
}
