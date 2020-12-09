import { DateTime } from 'luxon'
import InternalServerException from 'App/Exceptions/InternalServerException'

export class BaseRepository {
  private _model

  constructor({ model }) {
    this._model = model
  }

  protected get Model() {
    if (!this._model) {
      throw new InternalServerException('MODEL_UNSETED', 500)
    }

    return this._model
  }

  public query() {
    return this.Model.query().whereNull('deleted_at').whereIn('status', ['approved'])
  }

  public async getOne(id: string, includes?) {
    let query = this.query()

    if (includes) {
      includes.map((include) => {
        query = query + `.preload(${include})`
      })
    }

    return query.where({ id }).first()
  }

  public async getAll(includes?) {
    let query = this.query()

    if (includes) {
      includes.map((include) => {
        query = query + `.preload(${include})`
      })
    }

    return query
  }

  public async create(payload) {
    return this.Model.create(payload)
  }

  public async update(id: string, payload) {
    return this.query().where({ id }).update(payload)
  }

  public async delete(id: string) {
    const model = await this.getOne(id)

    model.status = 'deleted'
    model.deletedAt = DateTime.fromJSDate(new Date())

    return model.save()
  }
}
