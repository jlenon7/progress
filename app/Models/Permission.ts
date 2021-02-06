import { Role } from './Role'
import { DateTime } from 'luxon'
import { Token } from '@secjs/core'
import { Application } from './Application'
import { column, BaseModel, beforeCreate, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'

export class Permission extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string

  @column()
  public slug: string

  @column()
  public description: string

  @manyToMany(() => Application)
  public applications: ManyToMany<typeof Application>

  @manyToMany(() => Role)
  public roles: ManyToMany<typeof Role>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async generateId(role: Role) {
    role.id = new Token().generate()
  }
}
