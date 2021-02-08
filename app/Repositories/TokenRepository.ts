import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { BaseRepository } from './BaseRepository'
import { Token, TokenDocument } from 'app/Schemas/Token'

@Injectable()
export class TokenRepository extends BaseRepository<TokenDocument> {
  @InjectModel(Token.name) protected Model: Model<TokenDocument>
}
