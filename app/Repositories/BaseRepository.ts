import { DateTime } from 'luxon'
import { BaseModel } from '@ioc:Adonis/Lucid/Orm'
import {
  ApiRequestContract,
  IncludesContract,
  OrderByContract,
  WhereContract,
} from 'App/Contracts/ApiRequestContract'

export class BaseRepository {
  protected Model: typeof BaseModel | any

  public query() {
    return this.Model.query().whereNull('deleted_at')
  }

  public async getOne(id?: string | null, data?: ApiRequestContract | null) {
    let query = this.query()

    if (id) {
      query = this.query().where('id', id)
    }

    if (!data) {
      return query.first()
    }

    const { where, includes } = data

    if (where) {
      where.map((where: WhereContract) => {
        query.where(where.key, where.value)
      })
    }

    if (includes) {
      includes.map((include: IncludesContract) => {
        if (include.where) {
          query.preload(include.relation, (includeQuery) => {
            if (include.where) {
              include.where.map((includeWhere: WhereContract) => {
                includeQuery.where(includeWhere.key, includeWhere.value)
              })
            }

            if (include.orderBy) {
              include.orderBy.map((includeOrderBy: OrderByContract) => {
                includeQuery.orderBy(includeOrderBy.key, includeOrderBy.ordenation)
              })
            }
          })
        }

        if (include.includes) {
          include.includes.map((include: IncludesContract) => {
            if (include.where)
              query.preload(include.relation, (query) => {
                if (include.where)
                  include.where.map((where: WhereContract) => {
                    query.where(where.key, where.value)
                  })
              })
          })
        }
      })
    }

    return query.first()
  }

  public async getAll(pagination, data?: ApiRequestContract) {
    let query = this.query()

    if (!data) {
      return query.paginate(pagination.page, pagination.limit)
    }

    const { where, orderBy, includes } = data

    if (where) {
      where.map((where: WhereContract) => {
        query.where(where.key, where.value)
      })
    }

    if (orderBy) {
      orderBy.map((orderBy: OrderByContract) => {
        query.orderBy(orderBy.key, orderBy.ordenation)
      })
    }

    if (includes) {
      includes.map((include: IncludesContract) => {
        if (include.where) {
          query.preload(include.relation, (includeQuery) => {
            if (include.where) {
              include.where.map((includeWhere: WhereContract) => {
                includeQuery.where(includeWhere.key, includeWhere.value)
              })
            }

            if (include.orderBy) {
              include.orderBy.map((includeOrderBy: OrderByContract) => {
                includeQuery.orderBy(includeOrderBy.key, includeOrderBy.ordenation)
              })
            }
          })
        }

        if (include.includes) {
          include.includes.map((include: IncludesContract) => {
            if (include.where)
              query.preload(include.relation, (query) => {
                if (include.where)
                  include.where.map((where: WhereContract) => {
                    query.where(where.key, where.value)
                  })
              })
          })
        }
      })
    }

    return query.paginate(pagination.page, pagination.limit)
  }

  public async create(payload) {
    return this.Model.create(payload)
  }

  public async update(id: string, payload) {
    const model = await this.getOne(id)

    Object.keys(payload).map((key) => {
      model[key] = payload[key]
    })

    return model.save()
  }

  public async delete(id: string) {
    const model = await this.getOne(id)

    model.status = 'deleted'
    model.deletedAt = DateTime.fromJSDate(new Date())

    return model.save()
  }
}
