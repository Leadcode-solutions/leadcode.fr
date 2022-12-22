import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export class RoleValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    label: schema.string({ trim: true }),
    power: schema.number.optional([rules.range(0,1000)]),
    icon: schema.file.optional(),
    permissions: schema.array().members(schema.number([
      rules.exists({ table: 'permissions', column: 'id' })
    ]))
  })

  public messages: CustomMessages = {
    required: 'Le champ {{ field }} est requis',
  }
}
