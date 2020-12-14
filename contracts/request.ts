declare module '@ioc:Adonis/Core/HttpContext' {
  interface HttpContextContract {
    pagination?: {
      page: number | string
      limit: number | string
    }
  }
}
