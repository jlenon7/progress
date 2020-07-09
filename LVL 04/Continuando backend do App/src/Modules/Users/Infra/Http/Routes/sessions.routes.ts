import { Router } from 'express'
import SessionsController from '@Modules/Users/Infra/Http/Controllers/SessionsController'

const sessionsRouter = Router()
const sessionsController = new SessionsController()

sessionsRouter.post('/', sessionsController.store)

export default sessionsRouter
