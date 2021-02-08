import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Application, ApplicationDocument } from 'app/Schemas/Application'
import { MongooseRepository } from '@secjs/core/build/Base/Repositories/MongooseRepository'

@Injectable()
export class ApplicationRepository extends MongooseRepository<ApplicationDocument> {
  @InjectModel(Application.name) protected Model: Model<ApplicationDocument>
}
