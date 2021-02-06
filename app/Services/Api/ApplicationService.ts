import { BaseService } from 'App/Services'
import { ApplicationRepository } from 'App/Repositories/ApplicationRepository'
import { ApiRequestContract } from 'App/Contracts/ApiRequestContract'

import NotFoundException from 'App/Exceptions/NotFoundException'

export class ApplicationService extends BaseService {
  public async getAll(pagination, data?: ApiRequestContract) {
    return new ApplicationRepository().getAll(pagination, data)
  }

  public async getOne(id: string, data?: ApiRequestContract) {
    const application = await new ApplicationRepository().getOne(id, data)

    if (!application) {
      throw new NotFoundException()
    }

    return application
  }

  public async update(id: string, data) {
    return new ApplicationRepository().update(id, data)
  }

  public async delete(id: string) {
    const application = await new ApplicationRepository().delete(id)

    if (!application) {
      throw new NotFoundException()
    }

    return application
  }
}
