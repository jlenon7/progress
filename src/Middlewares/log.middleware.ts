import { Request, Response } from 'express'

const logMiddleware = (req: Request, res: Response, next: any) => {
  console.log('Middleware working')
  next()
}

export default logMiddleware