import { DateTime } from 'luxon'
import { Token } from '@secjs/core'
import {
  column,
  hasMany,
  HasMany,
  BaseModel,
  beforeSave,
  beforeCreate,
  afterCreate,
  manyToMany,
  ManyToMany,
} from '@ioc:Adonis/Lucid/Orm'

import Hash from '@ioc:Adonis/Core/Hash'
import { Attachment } from './Attachment'
import { UserToken } from './UserToken'
import { Role } from './Role'
import { Permission } from './Permission'

export { User }

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string

  @column()
  public email: string

  @column()
  public token: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public status: 'pendent' | 'approved' | 'reproved' | 'deleted'

  @column()
  public rememberMeToken?: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column.dateTime()
  public deletedAt: DateTime

  @hasMany(() => Attachment)
  public attachments: HasMany<typeof Attachment>

  @hasMany(() => UserToken)
  public userTokens: HasMany<typeof UserToken>

  @manyToMany(() => Role)
  public roles: ManyToMany<typeof Role>

  @manyToMany(() => Permission)
  public permissions: ManyToMany<typeof Permission>

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) user.password = await Hash.make(user.password)
  }

  @beforeSave()
  public static async trimEmail(user: User) {
    if (user.$dirty.email) user.email = user.email.toLowerCase()
  }

  @beforeCreate()
  public static async generateToken(user: User) {
    user.token = new Token().generate('usr')
  }

  @beforeCreate()
  public static async generateId(user: User) {
    user.id = new Token().getToken(user.token)
  }

  @afterCreate()
  public static async defaultRole(user: User) {
    const customerRole = await Role.findByOrFail('slug', 'customer')

    await user.related('roles').attach([customerRole.id])
  }

  @afterCreate()
  public static async generateConfirmToken(user: User) {
    const today = new Date()
    const tommorow = new Date(today.setDate(today.getDate() + 1))

    await user.related('userTokens').create({
      name: 'Confirmation Token',
      type: 'confirmation_token',
      token: new Token().generate('utk'),
      expiresAt: DateTime.fromJSDate(tommorow),
    })
  }
}
