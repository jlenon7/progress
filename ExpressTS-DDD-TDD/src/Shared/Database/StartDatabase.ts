import knex from 'knex'
import { injectable, inject } from 'tsyringe'
import { createConnection, Connection as TypeORMConnection } from 'typeorm'
import mongoose, { Mongoose } from 'mongoose'
import IStartDatabase from './IStartDatabase'

@injectable()
export default class StartDatabase implements IStartDatabase {
  constructor(
    @inject('StartDatabase')
    private option: string
  ) {
    if (this.option === 'typeorm') {
      this.TypeORM()
    } else if (this.option === 'mongoose') {
      this.Mongoose()
    } else if (this.option === 'knex') {
      this.Knex()
    }
  }

  public async TypeORM(): Promise<void> {
    console.log('1',this.option)
  }

  public async Mongoose(): Promise<void> {
    console.log('2',this.option)
  }

  public async Knex(): Promise<void>  {
    console.log('3',this.option)
  }
}
