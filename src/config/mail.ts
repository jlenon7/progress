import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'

export default {
  transport: {
    host: 'smtp.example.com',
    port: 587,
    secure: false, // upgrade later with STARTTLS
    auth: {
      user: 'username',
      pass: 'password',
    },
  },
  defaults: {
    from: '"nest-modules" <modules@nestjs.com>',
  },
  template: {
    dir: process.cwd() + '/app/views/mail/',
    adapter: new HandlebarsAdapter(),
    options: {
      strict: true,
    },
  },
}
