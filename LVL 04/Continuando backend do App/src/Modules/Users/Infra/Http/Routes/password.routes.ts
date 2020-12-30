import { Router } from 'express'
import ForgotPasswordController from '@Modules/Users/Infra/Http/Controllers/ForgotPasswordController'
import ResetPasswordController from '@Modules/Users/Infra/Http/Controllers/ResetPasswordController'

const passwordRouter = Router()
const forgotPasswordController = new ForgotPasswordController()
const resetPasswordController = new ResetPasswordController()

passwordRouter.post('/forgot', forgotPasswordController.store)
passwordRouter.post('/reset', resetPasswordController.store)

export default passwordRouter
