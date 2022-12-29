import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { afterCreate, beforeUpdate, BaseModel, beforeCreate, beforeSave, column, manyToMany, ManyToMany, beforeDelete } from '@ioc:Adonis/Lucid/Orm'
import Role from 'Domains/Users/Models/Role'
import { randomUUID } from 'node:crypto'
import Permission from 'Domains/Users/Models/Permission'
import Reporter from 'Domains/Reporters/Models/Reporter'
import HttpContext from '@ioc:Adonis/Core/HttpContext'
import Env from '@ioc:Adonis/Core/Env'
import { attachment, AttachmentContract } from '@ioc:Adonis/Addons/AttachmentLite'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public username: string

  @column()
  public isAdmin: boolean

  @column()
  public isLocked: boolean

  @column()
  public email: string

  @column()
  public provider: string

  @column()
  public providerId: string

  @column()
  public hasEmailConfirmed: boolean

  @column({ serializeAs: null })
  public password: string | null

  @attachment({ preComputeUrl: true })
  public avatar: AttachmentContract

  @attachment({ preComputeUrl: true })
  public banner: AttachmentContract

  @column()
  public rememberMeToken?: string

  @manyToMany(() => Role)
  public roles: ManyToMany<typeof Role>

  @manyToMany(() => Permission)
  public permissions: ManyToMany<typeof Permission>

  @column.dateTime({ autoCreate: true, serialize: (value: DateTime | null) => {
    return value ? value.toFormat('yyyy-L-mm') : value
  }})
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  public hasRole (identifier: string) {
    return this.roles.some((role: Role) => role.label == identifier)
  }

  public hasRoles () {
    return this.roles?.length
      ? this.roles.some((role) => role.permissions.length)
      : false
  }

  public hasPermission (identifier: string) {
    const permissionList: String[] = []
    this.roles.forEach((role: Role) => {
      role.permissions.forEach((permission: Permission) => {
        if (permissionList.includes(permission.key)) {
          permissionList.push(permission.key)
        }
      })
    })

    return permissionList.includes(identifier);
  }

  @beforeCreate()
  public static async generateUuid (user: User) {
    user.id = randomUUID()
  }

  @beforeSave()
  public static async hashPassword (User: User) {
    if (User.$dirty.password) {
      if (User.password != null) {
        User.password = await Hash.make(User.password)
      }
    }
  }

  @afterCreate()
  public static async afterCreate (user: User) {
    if (Env.get('NODE_ENV') === 'test') {
      return
    }

    //const ctx = HttpContext.get()!
    await user.load('roles')

    await Reporter.create({
      type: 'store',
      userId: user.id,
      label: 'User created',
      body: JSON.stringify(user.toJSON())
    })
  }

  @beforeUpdate()
  public static async beforeUpdate (user: User) {
    if (Env.get('NODE_ENV') === 'test') {
      return
    }

    const ctx = HttpContext.get()!
    await user.load('roles')

    await Reporter.create({
      type: 'update',
      userId: ctx.auth.user?.id,
      label: 'User updated',
      body: JSON.stringify(user.toJSON())
    })
  }

  @beforeDelete()
  public static async beforeDelete (user: User) {
    if (Env.get('NODE_ENV') === 'test') {
      return
    }

    const ctx = HttpContext.get()!
    await user.load('roles')

    await Reporter.create({
      type: 'destroy',
      userId: ctx.auth.user?.id,
      label: 'User deleted',
      body: JSON.stringify(user.toJSON())
    })
  }
}
