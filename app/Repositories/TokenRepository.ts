import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Token, TokenDocument } from 'app/Schemas/Token'
import { MongooseRepository } from '@secjs/core/build/Base/Repositories/MongooseRepository'

@Injectable()
export class TokenRepository extends MongooseRepository<TokenDocument> {
  @InjectModel(Token.name) protected Model: Model<TokenDocument>
}
