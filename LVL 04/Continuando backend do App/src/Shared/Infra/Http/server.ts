import 'reflect-metadata'

import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import 'express-async-errors'
import routes from './Routes'
import uploadConfig from '@Config/upload'

import AppError from '@Shared/Errors/AppError'

import '@Shared/Infra/Typeorm'
import '@Shared/Container'

const app = express()

app.use(cors())
app.use(express.json())
app.use('/files', express.static(uploadConfig.uploadsFolder))
app.use(routes)

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    })
  }

  console.log(err)

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  })
})

app.listen(3333, () => {
  console.log(`🚀 Server is listening on port ${process.env.PORT || 3333} 🤯`)
})
