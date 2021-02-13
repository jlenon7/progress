import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AwsModule } from '../aws/aws.module'
import { PassportModule } from '@nestjs/passport'
import { JwtStrategy } from './jwt.strategy'

@Module({
  imports:[
    PassportModule.register({defaultStrategy: 'jwt'}),
    AwsModule
  ],
  providers: [JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
