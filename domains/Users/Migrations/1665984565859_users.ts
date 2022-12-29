import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UsersSchema extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.string('email', 255).notNullable()
      table.string('password', 180)
      table.string('remember_me_token').nullable()
      table.string('username').notNullable()
      table.string('provider')
      table.string('provider_id')
      table.boolean('is_admin').defaultTo(false)
      table.boolean('is_locked').defaultTo(false)
      table.string('has_email_confirmed').defaultTo(false)

      /**
       * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
