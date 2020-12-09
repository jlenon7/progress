import { User } from './User'

import { DateTime } from 'luxon'
import { Token } from '@secjs/core'
import { column, BaseModel, beforeCreate, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'

export class Attachment extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public userId: string

  @column()
  public name: string

  @column()
  public icon: string

  @column()
  public path: string

  @column()
  public size: string

  @column()
  public original_name: string

  @column()
  public token: string

  @column()
  public from_token: string

  @column()
  public type: 'avatar' | 'rg' | 'cnh'

  @column()
  public extension: string

  @column()
  public status: 'pendent' | 'approved' | 'reproved' | 'deleted'

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column.dateTime()
  public deletedAt: DateTime

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @beforeCreate()
  public static async generateToken(attachment: Attachment) {
    attachment.token = new Token().generate('atc')
  }

  @beforeCreate()
  public static async generateId(attachment: Attachment) {
    attachment.id = new Token().getToken(attachment.token)
  }
}
