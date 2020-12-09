import { DateTime } from 'luxon'
import { Token } from '@secjs/core'
import { column, BaseModel, beforeCreate, BelongsTo, belongsTo } from '@ioc:Adonis/Lucid/Orm'

import { User } from './User'

export class UserToken extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public userId: string

  @column()
  public name: string

  @column()
  public type: 'forgot_token' | 'confirmation_token'

  @column()
  public token: string

  @column({ serializeAs: null })
  public password: string

  @column.dateTime({ autoCreate: true })
  public expiresAt: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @beforeCreate()
  public static async generateId(userToken: UserToken) {
    userToken.id = new Token().generate()
  }
}
