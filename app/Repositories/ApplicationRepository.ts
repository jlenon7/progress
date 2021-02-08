import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { BaseRepository } from './BaseRepository'
import { Application, ApplicationDocument } from 'app/Schemas/Application'

@Injectable()
export class ApplicationRepository extends BaseRepository<ApplicationDocument> {
  @InjectModel(Application.name) protected Model: Model<ApplicationDocument>
}
