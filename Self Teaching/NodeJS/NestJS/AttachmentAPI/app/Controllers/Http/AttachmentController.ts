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
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common'
import { ApiRequestContract } from '@secjs/core'
import { GetData } from 'app/Decorators/GetData'
import { Pagination } from 'app/Decorators/Pagination'
import { Application } from 'app/Decorators/Application'
import { FileFieldsInterceptor } from '@nestjs/platform-express'
import { AttachmentService } from 'app/Services/Api/AttachmentService'
import { ResponseInterceptor } from './Interceptors/ResponseInterceptor'
import { CreateAttachmentValidator } from '../Validators/CreateAttachmentValidator'
import { UpdateAttachmentValidator } from '../Validators/UpdateAttachmentValidator'

@UseGuards(AppGuard)
@Controller('/attachments')
@UseInterceptors(ResponseInterceptor)
export default class AttachmentController {
  @Inject(AttachmentService)
  private attachmentService: AttachmentService

  @Patch()
  async list(
    @Pagination() pagination,
    @Application() application,
    @GetData() data: ApiRequestContract,
  ) {
    return this.attachmentService.setGuard(application).list(pagination, data)
  }

  @Patch('/:id')
  async show(
    @Param('id') id,
    @Application() application,
    @GetData() data: ApiRequestContract,
  ) {
    return this.attachmentService.setGuard(application).show(id, data)
  }

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'pathBack' }, { name: 'pathFront' }]),
  )
  async create(
    @UploadedFiles() files,
    @Application() application,
    @Body(ValidationPipe) body: CreateAttachmentValidator,
  ) {
    return this.attachmentService.setGuard(application).create(body, files)
  }

  @Put('/:id')
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'pathBack' }, { name: 'pathFront' }]),
  )
  async update(
    @Param('id') id,
    @UploadedFiles() files,
    @Application() application,
    @Body(ValidationPipe) body: UpdateAttachmentValidator,
  ) {
    return this.attachmentService.setGuard(application).update(id, body, files)
  }

  @Delete('/:id')
  async delete(@Param('id') id, @Application() application) {
    return this.attachmentService.setGuard(application).delete(id)
  }
}
