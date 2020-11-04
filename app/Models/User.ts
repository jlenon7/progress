import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm'
import { Field, ObjectType } from '@nestjs/graphql'

import { UserToken } from './UserToken'
import { UserRoleEnum } from '../Enums/UserRoleEnum'
import { UserStatusEnum } from '../Enums/UserStatusEnum'

@ObjectType()
@Unique(['email'])
@Entity({ name: 'users' })
export class User {
  @Field({ nullable: false })
  @PrimaryGeneratedColumn('uuid')
  id: string

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

  @Field()
  @Column({
    type: 'enum',
    enum: UserStatusEnum,
    default: UserStatusEnum.PENDENT,
  })
  status: UserStatusEnum

  @Field()
  @CreateDateColumn()
  created_at: Date

  @Field()
  @UpdateDateColumn()
  updated_at: Date

  @Field({ nullable: true })
  @DeleteDateColumn()
  deleted_at: Date

  // Associations
  @OneToMany(
    () => UserToken,
    token => token.userConnection,
  )
  tokenConnection: Promise<UserToken[]>
}
