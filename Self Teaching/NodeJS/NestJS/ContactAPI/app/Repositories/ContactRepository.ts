import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Contact, ContactDocument } from 'app/Schemas/Contact'
import { MongooseRepository } from '@secjs/core/build/Base/Repositories/MongooseRepository'

@Injectable()
export class ContactRepository extends MongooseRepository<ContactDocument> {
  @InjectModel(Contact.name) protected Model: Model<ContactDocument>
}
