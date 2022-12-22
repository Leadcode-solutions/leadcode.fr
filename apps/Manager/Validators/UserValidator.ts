import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export class UserStoreValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    username: schema.string({ trim: true }),
    email: schema.string({ trim: true }, [rules.unique({ column: 'email', table: 'users' })]),
    password: schema.string({ trim: true}),
    is_admin: schema.boolean(),
    roles: schema.array().anyMembers()
  })

  public messages: CustomMessages = {
    required: 'Le champ {{ field }} est requis',
  }
}

export class UserUpdateValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    username: schema.string({ trim: true }),
    roles: schema.array().members(schema.number([rules.exists({ table: 'roles', column: 'id' })]))
  })

  public messages: CustomMessages = {
    required: 'Le champ {{ field }} est requis',
  }
}
