import { Connection } from '@Database/StartDatabase'
import IITems from '@Interfaces/IITems'

export default class ItemsRepository {
  public async all(): Promise<IITems[]> {
    const items = await Connection('items').select('*')

    return items
  }

  public async getById(): Promise<void> {

  }
}