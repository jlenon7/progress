import { Connection } from "@Database/StartDatabase";
import IPoint from "@Interfaces/IPoint";

export default class PointsRepository {
  public async all({ city, uf, items }: any): Promise<IPoint[]> {
    const parsedItems = String(items).split(',').map(item => Number(item.trim()))

    const points = await Connection('points')
      .join('point_items', 'points.id', '=', 'point_items.point_id')
      .whereIn('point_items.item_id', parsedItems)
      .where('city', String(city))
      .where('uf', String(uf))
      .distinct()
      .select('points.*')

    return points
  }

  public async getById(id: string): Promise<object | null> {
    const point = await Connection('points').where('id', id).first()

    if (!point) {
      return null
    }

    const items = await Connection('items')
      .join('point_items', 'items.id', '=', 'point_items.item_id')
      .where('point_items.point_id', id)
      .select('items.title')

    return { point, items }
  }
}