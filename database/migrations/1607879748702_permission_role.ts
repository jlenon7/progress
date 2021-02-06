import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class PermissionRoles extends BaseSchema {
  protected tableName = 'permission_role'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.uuid('role_id').unsigned().index()
      table.uuid('permission_id').unsigned().index()

      table.foreign('role_id').references('id').inTable('roles').onDelete('cascade')
      table.foreign('permission_id').references('id').inTable('permissions').onDelete('cascade')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
