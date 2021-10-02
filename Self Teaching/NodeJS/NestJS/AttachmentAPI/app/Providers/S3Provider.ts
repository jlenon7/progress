import { S3, Endpoint } from 'aws-sdk'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class S3Provider {
  private _s3: S3

  private configs: any

  public bucket: string

  constructor(private configService: ConfigService) {
    this.configs = this.configService.get('s3')
    this.bucket = this.configs.Bucket

    this._s3 = new S3({
      endpoint: new Endpoint(this.configs.endpoint),
      accessKeyId: this.configs.accessKeyId,
      secretAccessKey: this.configs.secretAccessKey,
    })
  }

  get s3(): S3 {
    return this._s3
  }
}
