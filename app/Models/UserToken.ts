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
  public type: 'forgot_token' | 'confirmation_token' | 'api_token'

  @column()
  public ip?: string

  @column()
  public token: string

  @column()
  public status: 'created' | 'expired' | 'used' | 'in_use'

  @column.dateTime()
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
