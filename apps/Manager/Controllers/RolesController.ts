import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Role from 'Domains/Users/Models/Role'
import { RoleValidator } from 'App/Manager/Validators/RoleValidator'
import Permission from 'Domains/Users/Models/Permission'
import { Attachment } from '@ioc:Adonis/Addons/AttachmentLite'

export default class RolesController {
  public async index ({ bouncer, inertia }: HttpContextContract) {
    await bouncer.with('RolePolicy').authorize('view')

    const roles = await Role.query().orderBy('power', 'desc')
    return inertia.render('accounts/roles/index', { roles })
  }

  public async create ({ bouncer, inertia }: HttpContextContract) {
    await bouncer.with('RolePolicy').authorize('store')

    const permissions = await Permission.all()
    return inertia.render('accounts/roles/create', { permissions })
  }

  public async store ({ bouncer, request, response }: HttpContextContract) {
    await bouncer.with('RolePolicy').authorize('store')

    const data = await request.validate(RoleValidator)
    const role = await Role.create({
      ...data,
      icon: data.icon
        ? Attachment.fromFile(data.icon)
        : undefined
    })

    await role.load('permissions')
    await role.related('permissions').attach(data.permissions)

    return response.redirect().toRoute('manager.roles.index')
  }

  public async edit ({ bouncer, params, inertia }: HttpContextContract) {
    await bouncer.with('RolePolicy').authorize('update')

    const permissions = await Permission.query().select('id', 'label')
    const role = await Role.query()
      .where('id', params.id)
      .preload('permissions').first()

    return inertia.render('accounts/roles/edit', { role, permissions })
  }

  public async update ({ bouncer, request, response, params }: HttpContextContract) {
    await bouncer.with('RolePolicy').authorize('update')

    const data = await request.validate(RoleValidator)
    const role = await Role.query()
      .where('id', params.id)
      .preload('permissions', (query) => query.select('id', 'label'))
      .first()

    await Promise.all([
      role?.merge({ ...data,
        icon: data.icon
          ? Attachment.fromFile(data.icon)
          : role.icon
      }).save(),
      role?.related('permissions').sync(data.permissions)
    ])

    return response.redirect().toRoute('manager.roles.index')
  }

  public async destroy ({ bouncer, params, response }: HttpContextContract) {
    await bouncer.with('RolePolicy').authorize('destroy')

    const role = await Role.find(params.id)
    await role?.delete()

    return response.redirect().toRoute('manager.roles.index')
  }
}
