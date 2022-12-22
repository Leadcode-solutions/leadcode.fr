import { DateTime } from 'luxon'
import { afterCreate, BaseModel, beforeDelete, beforeUpdate, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Permission from 'Domains/Users/Models/Permission'
import { attachment, AttachmentContract } from '@ioc:Adonis/Addons/AttachmentLite'
import HttpContext from '@ioc:Adonis/Core/HttpContext'
import Reporter from 'Domains/Reporters/Models/Reporter'
import Env from '@ioc:Adonis/Core/Env'

export default class Role extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public label: string

  @column()
  public power: number

  @attachment({preComputeUrl: true})
  public icon: AttachmentContract

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @manyToMany(() => Permission)
  public permissions: ManyToMany<typeof Permission>

  @afterCreate()
  public static async afterCreate (role: Role) {
    if (Env.get('NODE_ENV') === 'test') {
      return
    }

    const ctx = HttpContext.get()!
    await role.load('permissions')

    await Reporter.create({
      type: 'store',
      userId: ctx.auth.user?.id,
      label: 'Role created',
      body: JSON.stringify(role.toJSON())
    })
  }

  @beforeUpdate()
  public static async beforeUpdate (role: Role) {
    if (Env.get('NODE_ENV') === 'test') {
      return
    }

    const ctx = HttpContext.get()!
    await role.load('permissions')

    await Reporter.create({
      type: 'update',
      userId: ctx.auth.user?.id,
      label: 'Role updated',
      body: JSON.stringify(role.toJSON())
    })
  }

  @beforeDelete()
  public static async beforeDelete (role: Role) {
    if (Env.get('NODE_ENV') === 'test') {
      return
    }

    const ctx = HttpContext.get()!
    await role.load('permissions')

    await Reporter.create({
      type: 'destroy',
      userId: ctx.auth.user?.id,
      label: 'Role deleted',
      body: JSON.stringify(role.toJSON())
    })
  }
}
