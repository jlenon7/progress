import AppGuard from './Guards/AppGuard'

import {
  Body,
  Controller,
  Delete,
  Inject,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common'
import { ApiRequestContract } from '@secjs/core'
import { GetData } from 'app/Decorators/GetData'
import { Application } from 'app/Decorators/Application'
import { AddressService } from 'app/Services/Api/AddressService'
import { ResponseInterceptor } from './Interceptors/ResponseInterceptor'
import { CreateAddressValidator } from '../Validators/CreateAddressValidator'
import { UpdateAddressValidator } from '../Validators/UpdateAddressValidator'

@UseGuards(AppGuard)
@Controller('/addresses')
@UseInterceptors(ResponseInterceptor)
export default class AddressController {
  @Inject(AddressService)
  private addressService: AddressService

  @Patch()
  async list(
    @Query() queries,
    @Application() application,
    @GetData() data: ApiRequestContract,
  ) {
    const pagination = {
      page: queries.page || 0,
      limit: queries.limit || 10,
    }

    return this.addressService.setGuard(application).list(pagination, data)
  }

  @Patch('/:id')
  async show(
    @Param('id') id,
    @Application() application,
    @GetData() data: ApiRequestContract,
  ) {
    return this.addressService.setGuard(application).show(id, data)
  }

  @Post()
  async create(
    @Application() application,
    @Body(ValidationPipe) body: CreateAddressValidator,
  ) {
    return this.addressService.setGuard(application).create(body)
  }

  @Put('/:id')
  async update(
    @Param('id') id,
    @Application() application,
    @Body(ValidationPipe) body: UpdateAddressValidator,
  ) {
    return this.addressService.setGuard(application).update(id, body)
  }

  @Delete('/:id')
  async delete(@Param('id') id, @Application() application) {
    return this.addressService.setGuard(application).delete(id)
  }
}
