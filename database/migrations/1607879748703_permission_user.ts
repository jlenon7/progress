import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class PermissionUsers extends BaseSchema {
  protected tableName = 'permission_user'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.uuid('permission_id').unsigned().index()
      table.uuid('user_id').unsigned().index()

      table.foreign('permission_id').references('id').inTable('permissions').onDelete('cascade')
      table.foreign('user_id').references('id').inTable('users').onDelete('cascade')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
