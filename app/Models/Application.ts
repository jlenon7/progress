import Hash from '@ioc:Adonis/Core/Hash'

import {
  column,
  hasMany,
  HasMany,
  BaseModel,
  beforeCreate,
  manyToMany,
  ManyToMany,
  beforeSave,
  afterCreate,
} from '@ioc:Adonis/Lucid/Orm'

import { Role } from './Role'
import { DateTime } from 'luxon'
import { Token } from '@secjs/core'
import { ApplicationToken } from './ApplicationToken'

export { Application }

export default class Application extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public token: string

  @column()
  public status: 'pendent' | 'pendent_issue' | 'approved' | 'reproved' | 'deleted'

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column.dateTime()
  public deletedAt: DateTime

  @manyToMany(() => Role, { pivotTable: 'role_application' })
  public roles: ManyToMany<typeof Role>

  @hasMany(() => ApplicationToken)
  public applicationTokens: HasMany<typeof ApplicationToken>

  @beforeSave()
  public static async hashPassword(application: Application) {
    if (application.$dirty.password) application.password = await Hash.make(application.password)
  }

  @beforeSave()
  public static async trimEmail(application: Application) {
    if (application.$dirty.email) application.email = application.email.toLowerCase()
  }

  @beforeCreate()
  public static async generateId(application: Application) {
    application.id = new Token().generate()
  }

  @beforeCreate()
  public static async generateToken(application: Application) {
    application.token = new Token().generate('app')
  }

  @afterCreate()
  public static async defaultRole(application: Application) {
    const applicationRole = await Role.findByOrFail('slug', 'application')

    await application.related('roles').attach([applicationRole.id])
  }

  @afterCreate()
  public static async generateConfirmToken(application: Application) {
    const today = new Date()
    const tommorow = new Date(today.setDate(today.getDate() + 1))

    await application.related('applicationTokens').create({
      name: 'Confirmation Token',
      type: 'confirmation_token',
      token: new Token().generate('utk'),
      expiresAt: DateTime.fromJSDate(tommorow),
    })
  }
}
