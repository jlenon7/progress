import { container } from 'tsyringe'

import '@Modules/Users/Providers'
import './Providers'

import IAppointmentsRepository from '@Modules/Appointments/Repositories/IAppointmentsRepository'
import AppointmentsRepository from '@Modules/Appointments/Infra/Typeorm/Repositories/AppointmentsRepository'

import IUsersRepository from '@Modules/Users/Repositories/IUsersRepository'
import UsersRepository from '@Modules/Users/Infra/Typeorm/Repositories/UsersRepository'

// import IUserTokensRepository from '@Modules/Users/Repositories/IUserTokensRepository'
// import UserTokensRepository from '@Modules/Users/Infra/Typeorm/Repositories/UserTokensRepository'

container.registerSingleton<IAppointmentsRepository>(
  'AppointmentsRepository',
  AppointmentsRepository,
)

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
)

// container.registerSingleton<IUsersRepository>(
//   'UsersRepository',
//   UsersRepository,
// )
