import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'role_user'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('role_id').unsigned().references('id').inTable('roles')
      table.uuid('user_id').references('id').inTable('users')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
