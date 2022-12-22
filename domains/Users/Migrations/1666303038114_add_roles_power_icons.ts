import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'roles'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('power').defaultTo(0)
      table.json('icon')
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumns('power', 'icon')
    })
  }
}
