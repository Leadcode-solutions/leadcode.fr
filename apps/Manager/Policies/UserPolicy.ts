import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'Domains/Users/Models/User'

export default class UserPolicy extends BasePolicy {
  public async before (user?: User) {
    if (!user) return false
    if (user.isAdmin) return true
    if (user.isLocked) return false

    return user.hasRoles()
  }

  public async view (user: User) {
    return user.hasPermission('store:user')
      || user.hasPermission('update:user')
      || user.hasPermission('destroy:user')
  }

  public async store (user: User) {
    return user.hasPermission('store:user')
  }

  public async update (user: User) {
    return user.hasPermission('update:user')
  }

  public async destroy (user: User) {
    return user.hasPermission('destroy:user')
  }
}