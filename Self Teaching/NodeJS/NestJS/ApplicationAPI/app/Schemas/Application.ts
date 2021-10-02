// import { Token } from './Token'
import * as mongoose from 'mongoose'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

export type ApplicationDocument = Application & mongoose.Document

@Schema({ timestamps: true })
export class Application {
  @Prop({ type: String, required: true })
  name: string

  @Prop({ type: String, required: true })
  email: string

  @Prop({ type: String, required: true })
  password: string

  @Prop({ type: String, required: true })
  prefix: string

  @Prop({ type: String, required: true })
  token: string

  @Prop({ type: Date, default: null })
  deletedAt?: Date

  @Prop({ type: String, default: 'pendent' })
  status: 'pendent' | 'approved' | 'reproved' | 'deleted' | 'pendent_issue'

  // @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Token' }] })
  // tokens: Token[]
}

export const ApplicationSchema = SchemaFactory.createForClass(Application)
