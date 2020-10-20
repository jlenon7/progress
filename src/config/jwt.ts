import app from './app'

export default {
  secret: app.appKey,
  signOptions: {
    expiresIn: '1d',
  },
}
