import * as mongoose from 'mongoose'
import { Application } from './Application'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

export type TokenDocument = Token & mongoose.Document

@Schema({ timestamps: true })
export class Token {
  @Prop({ type: String, required: true })
  title: string

  @Prop({ type: String, required: true })
  type:
    | 'forgot_token'
    | 'confirmation_token'
    | 'api_token'
    | 'api_key'
    | 'api_secret'

  @Prop({ type: String })
  ip: string

  @Prop({ type: String, required: true })
  token: string

  @Prop({ type: String, required: true })
  value: string

  @Prop({ type: Date, default: null })
  deleted_at?: Date

  @Prop({ type: String, default: 'created' })
  status: 'created' | 'expired' | 'used' | 'in_use' | 'deleted'

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Application' })
  application: Application
}

export const TokenSchema = SchemaFactory.createForClass(Token)
