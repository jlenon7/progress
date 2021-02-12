import {
  ApiRequestContract,
  GuardBaseService,
  PaginationContract,
  Token,
} from '@secjs/core'

import { UploadService } from '../UploadService'
import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { ApplicationContract } from 'app/Contracts/ApplicationContract'
import { CreateAttachmentDto } from 'app/Contracts/Dtos/CreateAttachmentDto'
import { UpdateAttachmentDto } from 'app/Contracts/Dtos/UpdateAttachmentDto'
import { AttachmentRepository } from 'app/Repositories/AttachmentRepository'

@Injectable()
export class AttachmentService extends GuardBaseService<ApplicationContract> {
  @Inject(UploadService)
  private uploadService: UploadService

  @Inject(AttachmentRepository)
  private attachmentRepository: AttachmentRepository

  async list(pagination?: PaginationContract, data?: ApiRequestContract) {
    await this.initRequest(data)

    data.where.push({ key: 'serviceToken', value: this.guard.token })

    return this.attachmentRepository.getAll(pagination, data)
  }

  async create(dto: CreateAttachmentDto, files) {
    dto.mime = {}
    dto.serviceToken = this.guard.token
    dto.token = new Token().generate('atc')

    if (files.pathBack) {
      const info = await this.uploadService.uploadToS3(
        files.pathBack,
        dto.ownerId,
        dto.serviceToken,
      )

      const signedUrl = await this.uploadService.getS3SignedUrl(info.path)

      dto.mime.pathBack = info
      dto.mime.pathBack.url = signedUrl
    }

    if (files.pathFront) {
      const info = await this.uploadService.uploadToS3(
        files.pathFront,
        dto.ownerId,
        dto.serviceToken,
      )

      const signedUrl = await this.uploadService.getS3SignedUrl(info.path)

      dto.mime.pathFront = info
      dto.mime.pathFront.url = signedUrl
    }

    return this.attachmentRepository.storeOne(dto)
  }

  async show(id: string, data?: ApiRequestContract) {
    await this.initRequest(data)

    data.where.push({ key: 'serviceToken', value: this.guard.token })

    const attachment = await this.attachmentRepository.getOne(id, data)

    if (!attachment) {
      throw new NotFoundException('NOT_FOUND_ATTACHMENT')
    }

    return attachment
  }

  async update(id: string, dto: UpdateAttachmentDto, files) {
    const attachment = await this.show(id, {})

    if (files.pathBack) {
      const info = await this.uploadService.uploadToS3(
        files.pathBack,
        attachment.ownerId,
        attachment.serviceToken,
      )

      const signedUrl = await this.uploadService.getS3SignedUrl(info.path)

      attachment.mime.pathBack = info
      attachment.mime.pathBack.url = signedUrl
    }

    if (files.pathFront) {
      const info = await this.uploadService.uploadToS3(
        files.pathFront,
        attachment.ownerId,
        attachment.serviceToken,
      )

      const signedUrl = await this.uploadService.getS3SignedUrl(info.path)

      attachment.mime.pathFront = info
      attachment.mime.pathFront.url = signedUrl
    }

    return this.attachmentRepository.updateOne(dto, attachment)
  }

  async delete(id: string) {
    const attachment = await this.show(id, {})

    return this.attachmentRepository.deleteOne(attachment)
  }
}
