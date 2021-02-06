import { Application } from 'App/Models'
import { BaseRepository } from './BaseRepository'

export class ApplicationRepository extends BaseRepository {
  protected Model = Application
}
