import { DateTime } from 'luxon'
import { Token } from '@secjs/core'
import { column, BaseModel, beforeCreate, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import { User } from './User'
import { Permission } from './Permission'

export class Role extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string

  @column()
  public slug: string

  @column()
  public description: string

  @manyToMany(() => User)
  public users: ManyToMany<typeof User>

  @manyToMany(() => Permission)
  public permissions: ManyToMany<typeof Permission>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async generateId(role: Role) {
    role.id = new Token().generate()
  }
}
