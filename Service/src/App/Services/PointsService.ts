import { Connection } from '@Database/StartDatabase'
import IPoint from '@Interfaces/IPoint'

export default class ItemsService {
  public async create(data: IPoint): Promise<any> {
    const trx = await Connection.transaction()

    try {
      const insertedId = await trx('points').returning('id').insert({
        image: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
        name: data.name,
        email: data.email,
        whatsapp: data.whatsapp,
        latitude: data.latitude,
        longitude: data.longitude,
        city: data.city,
        uf: data.uf,
      })
  
      const pointItems = data.items.map(item_id => {
        return {
          item_id,
          point_id: insertedId[0],
        }
      })
  
      await trx('point_items').insert(pointItems)
      await trx.commit()

      return insertedId
    } catch(error) {
      console.log(error)
      await trx.rollback()
    }
    
  }
}