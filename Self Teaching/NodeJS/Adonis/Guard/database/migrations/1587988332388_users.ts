import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UsersSchema extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.string('name', 60).notNullable()
      table.string('email', 255).notNullable().unique()
      table.string('token', 255).notNullable().unique()
      table.string('password', 180).notNullable()
      table.enu('status', ['pendent', 'approved', 'reproved', 'deleted']).defaultTo('pendent')
      table.timestamps(true)
      table.dateTime('deleted_at')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
