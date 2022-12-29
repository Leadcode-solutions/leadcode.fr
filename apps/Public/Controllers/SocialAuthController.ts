import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import User from 'Domains/Users/Models/User'

export default class SocialAuthController {
  public async redirect ({ ally, params }: HttpContextContract) {
    return ally.use(params.provider).redirect()
  }

  public async callback ({ ally, response, session, params, auth }: HttpContextContract) {
    const provider = ally.use(params.provider)

    if (provider.accessDenied()) {
      session.flash({
        notification: {
          type: 'error',
          message: 'Access was denied'
        }
      })
      return response.redirect().toRoute('login')
    }
    const providerUser = await provider.user()
    const user = await User.firstOrCreate({
      email: providerUser.email!
    }, {
      username: providerUser.name,
      provider: params.provider,
      providerId: providerUser.id
    })

    await auth.login(user)
    return response.redirect().toRoute('home')

  }
}
