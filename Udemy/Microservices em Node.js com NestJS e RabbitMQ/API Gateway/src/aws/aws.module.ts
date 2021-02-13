import { Module } from '@nestjs/common';
import { AwsService } from './aws.service';
import { AwsCognitoConfig } from './aws-cognito.config'
import { AwsCognitoService } from './aws-cognito.service'

@Module({
  providers: [AwsService, AwsCognitoConfig, AwsCognitoService],
  exports: [AwsService, AwsCognitoConfig, AwsCognitoService]
})
export class AwsModule {}
