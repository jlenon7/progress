import { Router } from 'express'
import ensureAuthenticated from '@Modules/Users/Infra/Http/Middlewares/ensureAuthenticated'
import ProvidersController from '@Modules/Appointments/Infra/Http/Controllers/ProvidersController'

const providersRouter = Router()
const providersController = new ProvidersController()

providersRouter.use(ensureAuthenticated)
providersRouter.get('/', providersController.index)

export default providersRouter
