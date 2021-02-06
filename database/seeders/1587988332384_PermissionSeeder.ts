import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { Permission } from 'App/Models'

export default class PermissionSeederSeeder extends BaseSeeder {
  public async run() {
    await Permission.create({
      name: 'Create Applications',
      slug: 'create_applications',
      description: 'Create Applications Permission',
    })

    await Permission.create({
      name: 'Update Applications',
      slug: 'update_applications',
      description: 'Update Applications Permission',
    })

    await Permission.create({
      name: 'Show Applications',
      slug: 'show_applications',
      description: 'Show Applications Permission',
    })

    await Permission.create({
      name: 'List Applications',
      slug: 'list_applications',
      description: 'List Applications Permission',
    })

    await Permission.create({
      name: 'Delete Applications',
      slug: 'delete_applications',
      description: 'Delete Applications Permission',
    })
  }
}
