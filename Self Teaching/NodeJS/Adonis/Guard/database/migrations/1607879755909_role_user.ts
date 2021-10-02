import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class RoleUsers extends BaseSchema {
  protected tableName = 'role_user'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.uuid('role_id').unsigned().index()
      table.uuid('user_id').unsigned().index()

      table.foreign('role_id').references('id').inTable('roles').onDelete('cascade')
      table.foreign('user_id').references('id').inTable('users').onDelete('cascade')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
