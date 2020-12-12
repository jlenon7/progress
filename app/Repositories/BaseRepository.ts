import { DateTime } from 'luxon'
import { BaseModel } from '@ioc:Adonis/Lucid/Orm'
import {
  ApiRequestContract,
  IncludesConctract,
  OrderByContract,
  WhereContract,
} from 'App/Contracts/ApiRequestContract'

export class BaseRepository {
  protected Model: typeof BaseModel | any

  public query() {
    return this.Model.query().whereNull('deleted_at')
  }

  public async getOne(id: string, data?: ApiRequestContract) {
    let query = this.query().where('id', id)

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
      includes.map((include: IncludesConctract) => {
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
          include.includes.map((include: IncludesConctract) => {
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

  public async getAll(data?: ApiRequestContract) {
    if (!data) {
      let query = this.query()

      return query
    }

    const { where, orderBy, includes } = data

    let query = this.query()

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
      includes.map((include: IncludesConctract) => {
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
          include.includes.map((include: IncludesConctract) => {
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

    return query
  }

  public async create(payload) {
    return this.Model.create(payload)
  }

  public async update(id: string, payload) {
    return this.query().where('id', id).update(payload)
  }

  public async delete(id: string) {
    const model = await this.getOne(id)

    model.status = 'deleted'
    model.deletedAt = DateTime.fromJSDate(new Date())

    return model.save()
  }
}
