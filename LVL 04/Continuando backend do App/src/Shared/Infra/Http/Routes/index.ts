import { Router } from 'express'

import appointmentsRouter from '@Modules/Appointments/Infra/Http/Routes/appointments.routes'
import sessionsRouter from '@Modules/Users/Infra/Http/Routes/sessions.routes'
import usersRouter from '@Modules/Users/Infra/Http/Routes/users.routes'

const routes = Router()

routes.use('/appointments', appointmentsRouter)
routes.use('/sessions', sessionsRouter)
routes.use('/users', usersRouter)

export default routes
