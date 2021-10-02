import { Document } from 'mongoose'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

export type AttachmentDocument = Attachment & Document

@Schema({ timestamps: true })
export class Attachment {
  @Prop({ type: String, required: true })
  ownerId: string

  @Prop({ type: String, required: true })
  serviceToken: string

  @Prop({ type: String, required: true })
  token: string

  @Prop({ type: String, default: 'Attachment' })
  title: string

  @Prop({ type: String, default: 'Attachment' })
  icon: string

  @Prop({ type: String, required: true })
  type: 'avatar' | 'rg' | 'cnh' | 'cpf' | 'id' | 'proof_of_address' | 'mock'

  @Prop({ type: Object })
  mime?: {
    pathBack?: {
      url?: string
      path: string
      size: string
      extension: string
      originalName: string
    }
    pathFront?: {
      url?: string
      path: string
      size: string
      extension: string
      originalName: string
    }
  }

  @Prop({ type: Object })
  document?: {
    number?: string
    emission?: string
    expirationDate?: string
  }

  @Prop({ type: Date, default: null })
  deletedAt?: Date

  @Prop({ type: String, default: 'pendent' })
  status: 'pendent' | 'canceled' | 'actived' | 'deleted'
}

export const AttachmentSchema = SchemaFactory.createForClass(Attachment)
