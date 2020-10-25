import { Connection } from '@Database/StartDatabase'
import IITem from '@Interfaces/IITem'

export default class ItemsRepository {
  public async all(): Promise<IITem[]> {
    const items = await Connection('items').select('*')

    const serializedItems = items.map((item: IITem) => {
      return {
        id: item.id,
        title: item.title,
        image: `http://localhost:3333/uploads/${item.image}`,
      }
    })

    return serializedItems
  }

  public async getById(): Promise<void> {

  }
}