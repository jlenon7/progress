import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm'
import { Field, ObjectType } from '@nestjs/graphql'

import User from './user.entity'
import TokenTypeEnum from '../../../database/ENUM/token-type.enum'
import TokenStatusEnum from '../../../database/ENUM/token-status.enum'

@ObjectType()
@Entity({ name: 'user_tokens' })
export default class UserToken {
  @Field({ nullable: false })
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field()
  @Column()
  user_id: string

  @Field()
  @Column()
  token: string

  @Field()
  @Column({
    type: 'enum',
    enum: TokenTypeEnum,
  })
  type: TokenTypeEnum

  @Field()
  @Column()
  is_revoked: boolean

  @Field({ nullable: true })
  @Column()
  expires_in: string

  @Field()
  @Column({
    type: 'enum',
    enum: TokenStatusEnum,
    default: TokenStatusEnum.CREATED,
  })
  status: TokenStatusEnum

  @Field()
  @CreateDateColumn()
  created_at: Date

  @Field()
  @UpdateDateColumn()
  updated_at: Date

  @Field({ nullable: true })
  revoked_at: Date

  @Field(() => User)
  user: User

  // Associations
  @ManyToOne(
    () => User,
    user => user.tokenConnection,
    { primary: true },
  )
  @JoinColumn({ name: 'user_id' })
  userConnection: Promise<User>
}
