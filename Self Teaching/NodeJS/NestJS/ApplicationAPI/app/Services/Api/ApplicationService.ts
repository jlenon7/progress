import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { ApplicationContract } from 'app/Contracts/ApplicationContract'
import { ApiRequestContract, GuardBaseService, Token } from '@secjs/core'
import { CreateApplicationDto } from 'app/Contracts/Dtos/CreateApplicationDto'
import { UpdateApplicationDto } from 'app/Contracts/Dtos/UpdateApplicationDto'
import { ApplicationRepository } from 'app/Repositories/ApplicationRepository'

@Injectable()
export class ApplicationService extends GuardBaseService<ApplicationContract> {
  @Inject(ApplicationRepository)
  private applicationRepository: ApplicationRepository

  async create(dto: CreateApplicationDto) {
    dto.token = new Token().generate(dto.prefix)

    return this.applicationRepository.storeOne(dto)
  }

  async show(id: string, data?: ApiRequestContract) {
    await this.initRequest(data)

    const application = await this.applicationRepository.getOne(id, data)

    if (!application) {
      throw new NotFoundException('NOT_FOUND_APPLICATION')
    }

    return application
  }

  async update(id: string, dto: UpdateApplicationDto) {
    const application = await this.show(id, {})

    return this.applicationRepository.updateOne(dto, application)
  }

  async delete(id: string) {
    const application = await this.show(id, {})

    return this.applicationRepository.deleteOne(application)
  }
}
