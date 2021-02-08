import { Document } from 'mongoose'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

export type AddressDocument = Address & Document

@Schema({ timestamps: true })
export class Address {
  @Prop({ type: String, required: true })
  owner_id: string

  @Prop({ type: String, required: true })
  service_token: string

  @Prop({ type: String, required: true })
  token: string

  @Prop({ type: String, default: 'Address' })
  title: string

  @Prop()
  street?: string

  @Prop()
  number?: string

  @Prop()
  district?: string

  @Prop()
  complement?: string

  @Prop()
  city?: string

  @Prop()
  state?: string

  @Prop()
  country?: string

  @Prop()
  zip_code?: string

  @Prop({ type: Date, default: null })
  deleted_at?: Date

  @Prop({ type: String, default: 'pendent' })
  status: 'pendent' | 'canceled' | 'actived' | 'deleted'
}

export const AddressSchema = SchemaFactory.createForClass(Address)
