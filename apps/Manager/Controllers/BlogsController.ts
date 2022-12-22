import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class BlogsController {
  public async index ({ inertia, auth }: HttpContextContract) {
    return inertia.render('blogs/home', {
      auth: {
        user: auth.user,
        isLoggedIn: auth.isLoggedIn
      }
    })
  }

  public async show ({}: HttpContextContract) {}
  public async store ({}: HttpContextContract) {}
  public async update ({}: HttpContextContract) {}
  public async destroy ({}: HttpContextContract) {}
}
