import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'Domains/Users/Models/User'

export default class RolePolicy extends BasePolicy {
  public async before (user?: User) {
    if (!user) return false
    if (user.isAdmin) return true
    if (user.isLocked) return false

    return user.hasRoles()
  }

  public async view (user: User) {
    return user.hasPermission('store:role')
      || user.hasPermission('update:role')
      || user.hasPermission('destroy:role')
  }

  public async store (user: User) {
    return user.hasPermission('store:role')
  }

  public async update (user: User) {
    return user.hasPermission('update:role')
  }

  public async destroy (user: User) {
    return user.hasPermission('destroy:role')
  }
}
