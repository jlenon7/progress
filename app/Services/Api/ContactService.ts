import {
  ApiRequestContract,
  GuardBaseService,
  PaginationContract,
  Token,
} from '@secjs/core'
import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { CreateContactDto } from 'app/Contracts/Dtos/CreateContactDto'
import { UpdateContactDto } from 'app/Contracts/Dtos/UpdateContactDto'
import { ContactRepository } from 'app/Repositories/ContactRepository'
import { ApplicationContract } from 'app/Contracts/ApplicationContract'

@Injectable()
export class ContactService extends GuardBaseService<ApplicationContract> {
  @Inject(ContactRepository)
  private contactRepository: ContactRepository

  async list(pagination?: PaginationContract, data?: ApiRequestContract) {
    await this.initRequest(data)

    data.where.push({ key: 'serviceToken', value: this.guard.token })

    return this.contactRepository.getAll(pagination, data)
  }

  async create(dto: CreateContactDto) {
    dto.serviceToken = this.guard.token
    dto.token = new Token().generate('con')

    return this.contactRepository.storeOne(dto)
  }

  async show(id: string, data?: ApiRequestContract) {
    await this.initRequest(data)

    data.where.push({ key: 'serviceToken', value: this.guard.token })

    const contact = await this.contactRepository.getOne(id, data)

    if (!contact) {
      throw new NotFoundException('NOT_FOUND_CONTACT')
    }

    return contact
  }

  async update(id: string, dto: UpdateContactDto) {
    const contact = await this.show(id, {})

    return this.contactRepository.updateOne(dto, contact)
  }

  async delete(id: string) {
    const contact = await this.show(id, {})

    return this.contactRepository.deleteOne(contact)
  }
}
