import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { Role, Permission } from 'App/Models'

export default class RoleSeederSeeder extends BaseSeeder {
  public async run() {
    const roleAdmin = await Role.create({
      name: 'Admin',
      slug: 'admin',
      description: 'System Administrator',
    })

    const permListApplications = await Permission.findByOrFail('slug', 'list_applications')
    const permShowApplications = await Permission.findByOrFail('slug', 'show_applications')
    const permUpdateApplications = await Permission.findByOrFail('slug', 'update_applications')
    const permDeleteApplications = await Permission.findByOrFail('slug', 'delete_applications')
    const permCreateApplications = await Permission.findByOrFail('slug', 'create_applications')

    if (roleAdmin) {
      await roleAdmin
        .related('permissions')
        .attach([
          permListApplications.id,
          permShowApplications.id,
          permUpdateApplications.id,
          permDeleteApplications.id,
          permCreateApplications.id,
        ])
    }

    const roleApplication = await Role.create({
      name: 'Application',
      slug: 'application',
      description: 'System Application',
    })

    if (roleApplication) {
      await roleApplication
        .related('permissions')
        .attach([
          permListApplications.id,
          permShowApplications.id,
          permUpdateApplications.id,
          permDeleteApplications.id,
          permCreateApplications.id,
        ])
    }
  }
}
