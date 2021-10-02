import { Test } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import { HttpExceptionFilter } from 'app/Controllers/Http/Filters/HttpExceptionFilter'

export default class App {
  private imports: any[]
  public server: INestApplication

  constructor(imports: any[]) {
    this.imports = imports
  }

  getInstance<Instance>(instance: string) {
    return this.server.get<Instance>(instance)
  }

  async initApp() {
    const moduleRef = await Test.createTestingModule({
      imports: this.imports,
    }).compile()

    this.server = moduleRef.createNestApplication()

    const Config = this.getInstance<any>('ConfigService')
    this.server.useGlobalFilters(new HttpExceptionFilter(Config))

    await this.server.init()

    return this
  }

  async closeApp() {
    return this.server.close()
  }
}
