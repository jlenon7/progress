import { Router } from 'express'
import { container } from 'tsyringe'

import UsersRepository from '@Modules/Users/Infra/Typeorm/Repositories/UsersRepository'
import multer from 'multer'
import uploadConfig from '@Config/upload'
import CreateUserService from '@Modules/Users/Services/CreateUserService'
import ensureAuthenticated from '@Modules/Users/Infra/Http/Middlewares/ensureAuthenticated'

import UpdateUserAvatarService from '@Modules/Users/Services/UpdateUserAvatarService'

const usersRouter = Router()
const upload = multer(uploadConfig)

usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body

  const createUser = container.resolve(CreateUserService)

  const user = await createUser.execute({
    name,
    email,
    password,
  })

  delete user.password

  return response.json(user)
})

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const updateUserAvatar = container.resolve(UpdateUserAvatarService)

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    })

    delete user.password

    return response.json(user)
  },
)

export default usersRouter
