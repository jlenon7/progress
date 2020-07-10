import { Router } from 'express'
import ensureAuthenticated from '@Modules/Users/Infra/Http/Middlewares/ensureAuthenticated'

import ProfileController from '@Modules/Users/Infra/Http/Controllers/ProfileController'

const profileRouter = Router()
const profileController = new ProfileController()

profileRouter.use(ensureAuthenticated)

profileRouter.get('/', profileController.show)
profileRouter.put('/', profileController.update)

export default profileRouter
