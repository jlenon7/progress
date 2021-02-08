import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Address, AddressDocument } from 'app/Schemas/Address'
import { MongooseRepository } from '@secjs/core/build/Base/Repositories/MongooseRepository'

@Injectable()
export class AddressRepository extends MongooseRepository<AddressDocument> {
  @InjectModel(Address.name) protected Model: Model<AddressDocument>
}
