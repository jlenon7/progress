import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Attachment, AttachmentDocument } from 'app/Schemas/Attachment'
import { MongooseRepository } from '@secjs/core/build/Base/Repositories/MongooseRepository'

@Injectable()
export class AttachmentRepository extends MongooseRepository<
  AttachmentDocument
> {
  @InjectModel(Attachment.name) protected Model: Model<AttachmentDocument>
}
