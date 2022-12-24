import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {
  public async login ({ view }: HttpContextContract) {
    return view.render('public::pages/auth/login')
  }

  public async loginWeb ({ auth, request, response }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')

    try {
      await auth.use('web').attempt(email, password)
      response.redirect().toRoute('home')
    } catch {
      return response.badRequest('Invalid credentials')
    }
  }

  public async logout ({ auth, response }: HttpContextContract) {
    await auth.logout()

    return response.redirect().toRoute('home')
  }
}
