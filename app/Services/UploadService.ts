import * as path from 'path'
import { Inject, Injectable } from '@nestjs/common'
import { S3Provider } from 'app/Providers/S3Provider'

@Injectable()
export class UploadService {
  @Inject(S3Provider) private s3Provider: S3Provider

  async uploadToS3(file, ownerId, serviceToken) {
    const size = file[0].size
    const originalName = file[0].originalname
    const extension = path.extname(originalName)

    const fileName = `service-(${serviceToken})/ownerId-(${ownerId})/${Date.now()}${extension}`

    await this.s3Provider.s3
      .putObject({
        Body: file[0].buffer,
        Key: fileName,
        Bucket: this.s3Provider.bucket,
        ContentType: file[0].mimetype,
      })
      .promise()

    return {
      size,
      extension,
      originalName,
      path: fileName,
    }
  }

  async getS3SignedUrl(fileName) {
    return this.s3Provider.s3.getSignedUrlPromise('getObject', {
      Key: fileName,
      Bucket: this.s3Provider.bucket,
    })
  }

  // async resize(filePath, fileName) {}
}
