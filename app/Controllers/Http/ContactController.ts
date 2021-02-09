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
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common'
import { ApiRequestContract } from '@secjs/core'
import { GetData } from 'app/Decorators/GetData'
import { Pagination } from 'app/Decorators/Pagination'
import { Application } from 'app/Decorators/Application'
import { ContactService } from 'app/Services/Api/ContactService'
import { ResponseInterceptor } from './Interceptors/ResponseInterceptor'
import { CreateContactValidator } from '../Validators/CreateContactValidator'
import { UpdateContactValidator } from '../Validators/UpdateContactValidator'

@UseGuards(AppGuard)
@Controller('/contacts')
@UseInterceptors(ResponseInterceptor)
export default class ContactController {
  @Inject(ContactService)
  private contactService: ContactService

  @Patch()
  async list(
    @Pagination() pagination,
    @Application() application,
    @GetData() data: ApiRequestContract,
  ) {
    return this.contactService.setGuard(application).list(pagination, data)
  }

  @Patch('/:id')
  async show(
    @Param('id') id,
    @Application() application,
    @GetData() data: ApiRequestContract,
  ) {
    return this.contactService.setGuard(application).show(id, data)
  }

  @Post()
  async create(
    @Application() application,
    @Body(ValidationPipe) body: CreateContactValidator,
  ) {
    return this.contactService.setGuard(application).create(body)
  }

  @Put('/:id')
  async update(
    @Param('id') id,
    @Application() application,
    @Body(ValidationPipe) body: UpdateContactValidator,
  ) {
    return this.contactService.setGuard(application).update(id, body)
  }

  @Delete('/:id')
  async delete(@Param('id') id, @Application() application) {
    return this.contactService.setGuard(application).delete(id)
  }
}
