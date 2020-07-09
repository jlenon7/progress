import { Router } from 'express'
import ensureAuthenticated from '@Modules/Users/Infra/Http/Middlewares/ensureAuthenticated'
import AppointmentsController from '@Modules/Appointments/Infra/Http/Controllers/AppointmentsController'

const appointmentsRouter = Router()
const appointmentsController = new AppointmentsController()

appointmentsRouter.use(ensureAuthenticated)
appointmentsRouter.post('/', appointmentsController.store)

export default appointmentsRouter
