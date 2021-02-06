import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class PermissionApplications extends BaseSchema {
  protected tableName = 'permission_application'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.uuid('permission_id').unsigned().index()
      table.uuid('application_id').unsigned().index()

      table.foreign('permission_id').references('id').inTable('permissions').onDelete('cascade')
      table.foreign('application_id').references('id').inTable('applications').onDelete('cascade')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
