import { Router } from 'express'
import ensureAuthenticated from '@Modules/Users/Infra/Http/Middlewares/ensureAuthenticated'

import ProvidersController from '@Modules/Appointments/Infra/Http/Controllers/ProvidersController'
import ProviderMonthAvailabillityController from '@Modules/Appointments/Infra/Http/Controllers/ProviderMonthAvailabillityController'
import ProviderDayAvailabillityController from '@Modules/Appointments/Infra/Http/Controllers/ProviderDayAvailabillityController'

const providersRouter = Router()
const providersController = new ProvidersController()
const providerDayAvailabillityController = new ProviderDayAvailabillityController()
const providerMonthAvailabillityController = new ProviderMonthAvailabillityController()

providersRouter.use(ensureAuthenticated)
providersRouter.get('/', providersController.index)
providersRouter.get(
  '/:provider_id/month-availabillity',
  providerMonthAvailabillityController.index,
)
providersRouter.get(
  '/:provider_id/day-availabillity',
  providerDayAvailabillityController.index,
)

export default providersRouter
