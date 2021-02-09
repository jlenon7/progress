import { Document } from 'mongoose'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

export type ContactDocument = Contact & Document

@Schema({ timestamps: true })
export class Contact {
  @Prop({ type: String, required: true })
  ownerId: string

  @Prop({ type: String, required: true })
  serviceToken: string

  @Prop({ type: String, required: true })
  token: string

  @Prop({ type: String, default: 'Contact' })
  title: string

  @Prop({ type: String })
  type:
    | 'email'
    | 'cellphone'
    | 'phone'
    | 'whatsapp'
    | 'telegram'
    | 'facebook'
    | 'instagram'
    | 'linkedin'
    | 'site'

  @Prop()
  contact?: string

  @Prop({ type: Date, default: null })
  deletedAt?: Date

  @Prop({ type: String, default: 'pendent' })
  status: 'pendent' | 'canceled' | 'actived' | 'deleted'
}

export const ContactSchema = SchemaFactory.createForClass(Contact)
