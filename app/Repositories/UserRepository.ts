import User from 'App/Models/User'
import { BaseRepository } from './BaseRepository'

export class UserRepository extends BaseRepository {
  constructor() {
    super({ model: User })
  }
}
