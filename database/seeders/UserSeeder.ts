import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { Role, User } from 'App/Models'

export default class UserSeeder extends BaseSeeder {
  public async run() {
    const userOne = await User.create({
      name: 'João Lenon',
      email: 'lenonsec7@gmail.com',
      password: '12345678',
      status: 'reproved',
    })

    if (userOne) {
      await userOne.related('attachments').create({
        name: 'avatar',
        type: 'avatar',
        icon: 'avatar',
        path: 'http://localhost:3333/123123.png',
        size: '10mb',
        extension: 'png',
        from_token: userOne.token,
        original_name: 'my-photo',
      })
    }

    const userTwo = await User.create({
      name: 'João Lenon',
      email: 'lenonsec7@hotmail.com',
      password: '12345678',
      status: 'approved',
    })

    if (userTwo) {
      await userTwo.related('attachments').create({
        name: 'avatar',
        type: 'avatar',
        icon: 'avatar',
        path: 'http://localhost:3333/123123.png',
        size: '10mb',
        extension: 'png',
        from_token: userTwo.token,
        original_name: 'my-photo',
      })

      const role = await Role.findByOrFail('slug', 'admin')

      await userTwo.related('roles').attach([role.id])
    }
  }
}
