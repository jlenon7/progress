import { container } from 'tsyringe'

import IUsersRepository from '@Modules/Users/Repositories/IUsersRepository'
import UsersRepository from '@Modules/Users/Infra/Typeorm/Repositories/UsersRepository'
import IStartDatabase from '@Shared/Database/IStartDatabase'
import StartDatabase from '@Shared/Database/StartDatabase'

container.registerSingleton<IUsersRepository>(
  'UsersRepository', 
  UsersRepository
)

container.registerSingleton<IStartDatabase>('StartDatabase', StartDatabase)
