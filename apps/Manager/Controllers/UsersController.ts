import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { UserStoreValidator, UserUpdateValidator } from 'App/Manager/Validators/UserValidator'
import User from 'Domains/Users/Models/User'
import Role from 'Domains/Users/Models/Role'

export default class UsersController {
  public async index ({ bouncer, inertia }: HttpContextContract) {
    await bouncer.with('UserPolicy').authorize('view')

    const users = await User.query().preload('roles')
    return inertia.render('accounts/users/index', { users })
  }

  public async create ({ bouncer, inertia }: HttpContextContract) {
    await bouncer.with('UserPolicy').authorize('store')

    const roles = await Role.all()
    return inertia.render('accounts/users/create', { roles })
  }

  public async store ({ bouncer, request, response }: HttpContextContract) {
    await bouncer.with('UserPolicy').authorize('store')

    const data = await request.validate(UserStoreValidator)
    const user = await User.create(data)
    await user.load('roles')

    await user.related('roles').attach(data.roles)

    return response.redirect().toRoute('manager.users.index')
  }

  public async edit ({ bouncer, params, inertia }: HttpContextContract) {
    await bouncer.with('UserPolicy').authorize('update')

    const user = await User.query().where('id', params.id).preload('roles').first()
    const roles = await Role.all()

    return inertia.render('accounts/users/edit', { user, roles })
  }

  public async update ({ bouncer, request, response, params }: HttpContextContract) {
    await bouncer.with('UserPolicy').authorize('update')

    const data = await request.validate(UserUpdateValidator)
    const user = await User.query()
      .where('id', params.id)
      .preload('roles', (query) => query.select('id', 'label'))
      .first()

    await Promise.all([
      user?.merge(data).save(),
      user?.related('roles').sync(data.roles)
    ])

    return response.redirect().toRoute('manager.users.index')
  }

  public async destroy ({ bouncer, params, response }: HttpContextContract) {
    await bouncer.with('UserPolicy').authorize('destroy')

    const user = await User.find(params.id)
    await user?.delete()

    return response.redirect().toRoute('manager.users.index')
  }
}
