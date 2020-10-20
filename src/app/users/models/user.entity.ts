import { Column, Entity, OneToMany, Unique } from 'typeorm'
import { Field, ObjectType } from '@nestjs/graphql'

import BaseEntity from './base.entity'
import UserToken from './user.token.entity'
import UserRoleEnum from '../../../database/ENUM/user-role.enum'

@ObjectType()
@Unique(['email'])
@Entity({ name: 'users' })
export default class User extends BaseEntity {
  @Field()
  @Column()
  name: string

  @Field()
  @Column()
  email: string

  @Field()
  @Column()
  password: string

  @Field()
  @Column({
    type: 'enum',
    enum: UserRoleEnum,
    default: UserRoleEnum.CLIENT,
  })
  role: UserRoleEnum

  // Associations
  @OneToMany(
    () => UserToken,
    token => token.userConnection,
  )
  tokenConnection: Promise<UserToken[]>
}
