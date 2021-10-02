import * as path from 'path'
import * as dotenv from 'dotenv'

switch (process.env.NODE_ENV) {
  case 'testing':
    dotenv.config({ path: path.resolve(__dirname, '..', '.env.testing') })
    break
  // When inside dist or build folder
  default:
    dotenv.config({ path: path.resolve(__dirname, '..', '..', '.env') })
}
