import { DateTime } from 'luxon'
import { Token } from '@secjs/core'
import { Application } from './Application'
import { column, BaseModel, beforeCreate, BelongsTo, belongsTo } from '@ioc:Adonis/Lucid/Orm'

export class ApplicationToken extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public applicationId: string

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

  @belongsTo(() => Application)
  public application: BelongsTo<typeof Application>

  @beforeCreate()
  public static async generateId(applicationToken: ApplicationToken) {
    applicationToken.id = new Token().generate()
  }
}
