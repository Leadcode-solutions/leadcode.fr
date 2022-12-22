import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Inertia from '@ioc:EidelLev/Inertia'

/**
 * Silent auth middleware can be used as a global middleware to silent check
 * if the user is logged-in or not.
 *
 * The request continues as usual, even when the user is not logged-in.
 */
export default class SilentAuthMiddleware {
  /**
   * Handle request
   */
  public async handle({ auth }: HttpContextContract, next: () => Promise<void>) {
    /**
     * Check if user is logged-in or not. If yes, then `ctx.auth.user` will be
     * set to the instance of the currently logged in user.
     */
    Inertia.share({
      auth: {
        user: auth.user || null,
        isLoggedIn: auth.isLoggedIn
      },
    })

    await auth.check()
    await auth.user?.load((loader) => {
      loader.load('roles', (loader) => {
        loader.preload('permissions')
      })
    })
    await next()
  }
}
