import TokenGuard from './Guards/TokenGuard'

import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Ip,
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
import { Application } from 'app/Decorators/Application'
import { TokenService } from 'app/Services/Api/TokenService'
import { ApplicationService } from 'app/Services/Api/ApplicationService'
import { ResponseInterceptor } from './Interceptors/ResponseInterceptor'
import { CreateApplicationValidator } from '../Validators/CreateApplicationValidator'
import { UpdateApplicationValidator } from '../Validators/UpdateApplicationValidator'

@Controller('/applications')
@UseInterceptors(ResponseInterceptor)
export default class ApplicationController {
  @Inject(TokenService)
  private tokenService: TokenService

  @Inject(ApplicationService)
  private applicationService: ApplicationService

  @Get('/api')
  @UseGuards(TokenGuard)
  async api(@Application() application) {
    return application
  }

  @Post('/:id/api')
  async generateApi(@Param('id') id, @Ip() ip) {
    const application = await this.applicationService.show(id, {})
    const tokenKey = await this.tokenService.create({
      ip,
      application: application._id,
      title: 'API_KEY',
      type: 'api_key',
    })
    const tokenSecret = await this.tokenService.create({
      ip,
      application: application._id,
      title: 'SECRET',
      type: 'api_secret',
      token: tokenKey.token,
    })

    return {
      apiKey: tokenKey.value,
      secret: tokenSecret.value,
    }
  }

  @Patch('/:id')
  async show(@Param('id') id, @GetData() data: ApiRequestContract) {
    return this.applicationService.show(id, data)
  }

  @Post()
  async create(@Body(ValidationPipe) body: CreateApplicationValidator) {
    return this.applicationService.create(body)
  }

  @Put('/:id')
  async update(
    @Param('id') id,
    @Body(ValidationPipe) body: UpdateApplicationValidator,
  ) {
    return this.applicationService.update(id, body)
  }

  @Delete('/:id')
  async delete(@Param('id') id) {
    return this.applicationService.delete(id)
  }
}
