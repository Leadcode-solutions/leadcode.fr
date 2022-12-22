import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class DefaultController {
  public async home ({ bouncer, inertia, auth }: HttpContextContract) {
    await bouncer.with('ManagerPolicy').authorize('view')

    return inertia.render('home', {
      auth: {
        user: auth.user,
        isLoggedIn: auth.isLoggedIn
      }
    })
  }
}
