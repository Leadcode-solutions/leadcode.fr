import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class DefaultController {
  public async home ({ view }: HttpContextContract) {
    return view.render('public::index')
  }

  public async ui ({ view }: HttpContextContract) {
    return view.render('public::pages/ui')
  }
}
