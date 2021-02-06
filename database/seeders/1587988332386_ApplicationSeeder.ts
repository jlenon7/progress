import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { Role, Application } from 'App/Models'

export default class ApplicationSeeder extends BaseSeeder {
  public async run() {
    await Application.create({
      name: 'João Lenon',
      email: 'lenonSec7@gmail.com',
      password: '12345678',
      status: 'reproved',
    })

    const applicationTwo = await Application.create({
      name: 'João Lenon',
      email: 'lenonsec7@hotmail.com',
      password: '12345678',
      status: 'approved',
    })

    const role = await Role.findByOrFail('slug', 'admin')

    await applicationTwo.related('roles').attach([role.id])
  }
}
