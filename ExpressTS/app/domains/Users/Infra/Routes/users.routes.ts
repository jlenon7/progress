import { Router } from 'express'

import multer from 'multer'
import uploadConfig from '@Config/upload'
import ensureAuthenticated from '@Domain/Users/Infra/Middlewares/ensureAuthenticated'

import UsersController from '@Domain/Users/Infra/Controllers/UsersController'
import UserAvatarController from '@Domain/Users/Infra/Controllers/UserAvatarController'

const usersRouter = Router()
const usersController = new UsersController()
const userAvatarController = new UserAvatarController
const upload = multer(uploadConfig)

usersRouter.post('/', usersController.store)
usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), userAvatarController.update)

export default usersRouter
