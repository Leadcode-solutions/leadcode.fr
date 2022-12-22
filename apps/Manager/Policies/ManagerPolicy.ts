import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'Domains/Users/Models/User'

export default class ManagerPolicy extends BasePolicy {
  public async before (user?: User) {
    if (!user) return false
    if (user.isAdmin) return true
    if (user.isLocked) return false

    return user.hasRoles()
  }

  public async view (_: User) {
    return true
  }
}
