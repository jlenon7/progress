import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Field, ObjectType } from '@nestjs/graphql'

import StatusEnum from '../../../database/ENUM/status.enum'

@ObjectType()
export default class BaseEntity {
  @Field({ nullable: false })
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field()
  @Column({
    type: 'enum',
    enum: StatusEnum,
    default: StatusEnum.PENDENT,
  })
  status: StatusEnum

  @Field()
  @CreateDateColumn()
  created_at: Date

  @Field()
  @UpdateDateColumn()
  updated_at: Date

  @Field({ nullable: true })
  @DeleteDateColumn()
  deleted_at: Date
}
