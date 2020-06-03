import { Connection } from '../Database/StartDatabase'

export default class ItemsRepository {
  public async all(): Promise<> {
    const items = await Connection('items').select('*')

    return items
  }

  public async getById(): Promise<void> {

  }
}