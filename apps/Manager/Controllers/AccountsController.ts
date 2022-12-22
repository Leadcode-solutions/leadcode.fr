import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";

export default class AccountsController {
  public async index ({ inertia, auth }: HttpContextContract) {
    return inertia.render('accounts/home', {
      auth: {
        user: auth.user,
        isLoggedIn: auth.isLoggedIn
      }
    })
  }
}
