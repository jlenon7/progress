import * as dotenv from 'dotenv'

import { ConfigService } from '@nestjs/config'
dotenv.config({ path: `${__dirname}/../../.env` })

class EnvGet {
  private configService = new ConfigService()

  public get(name: string, defaultValue?: any): string {
    if (this.configService.get<string>(name)) {
      return this.configService.get<string>(name)
    }

    return defaultValue
  }
}

export default new EnvGet()
