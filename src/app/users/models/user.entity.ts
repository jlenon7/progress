import { Column, Entity, OneToMany, Unique } from 'typeorm'
import { Field, ObjectType } from '@nestjs/graphql'

import BaseEntity from './base.entity'
import UserToken from './user.token.entity'

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

  // Associations
  @OneToMany(
    () => UserToken,
    token => token.userConnection,
  )
  tokenConnection: Promise<UserToken[]>
}
