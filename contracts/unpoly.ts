import Unpoly from 'Services/Unpoly'

declare module '@ioc:Adonis/Core/HttpContext' {
  interface HttpContextContract {
    up: Unpoly
  }
}
