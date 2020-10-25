import { Router } from 'express'
import { celebrate, Segments, Joi } from 'celebrate'
import ensureAuthenticated from '@Modules/Users/Infra/Http/Middlewares/ensureAuthenticated'
import AppointmentsController from '@Modules/Appointments/Infra/Http/Controllers/AppointmentsController'
import ProviderAppointmentsController from '../Controllers/ProviderAppointmentsController'

const appointmentsRouter = Router()
const appointmentsController = new AppointmentsController()
const providerAppointmentsController = new ProviderAppointmentsController()

appointmentsRouter.use(ensureAuthenticated)
appointmentsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      provider_id: Joi.string().uuid().required(),
      date: Joi.date(),
    },
  }),
  appointmentsController.store,
)
appointmentsRouter.get('/me', providerAppointmentsController.index)

export default appointmentsRouter
