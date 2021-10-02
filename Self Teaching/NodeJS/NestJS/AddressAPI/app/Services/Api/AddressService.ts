import {
  ApiRequestContract,
  GuardBaseService,
  PaginationContract,
  Token,
} from '@secjs/core'
import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { CreateAddressDto } from 'app/Contracts/Dtos/CreateAddressDto'
import { UpdateAddressDto } from 'app/Contracts/Dtos/UpdateAddressDto'
import { AddressRepository } from 'app/Repositories/AddressRepository'
import { ApplicationContract } from 'app/Contracts/ApplicationContract'

@Injectable()
export class AddressService extends GuardBaseService<ApplicationContract> {
  @Inject(AddressRepository)
  private addressRepository: AddressRepository

  async list(pagination?: PaginationContract, data?: ApiRequestContract) {
    await this.initRequest(data)

    data.where.push({ key: 'serviceToken', value: this.guard.token })

    return this.addressRepository.getAll(pagination, data)
  }

  async create(dto: CreateAddressDto) {
    dto.serviceToken = this.guard.token
    dto.token = new Token().generate('adr')

    return this.addressRepository.storeOne(dto)
  }

  async show(id: string, data?: ApiRequestContract) {
    await this.initRequest(data)

    data.where.push({ key: 'serviceToken', value: this.guard.token })

    const address = await this.addressRepository.getOne(id, data)

    if (!address) {
      throw new NotFoundException('NOT_FOUND_ADDRESS')
    }

    return address
  }

  async update(id: string, dto: UpdateAddressDto) {
    const address = await this.show(id, {})

    return this.addressRepository.updateOne(dto, address)
  }

  async delete(id: string) {
    const address = await this.show(id, {})

    return this.addressRepository.deleteOne(address)
  }
}
