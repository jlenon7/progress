import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class RoleApplications extends BaseSchema {
  protected tableName = 'role_application'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.uuid('role_id').unsigned().index()
      table.uuid('application_id').unsigned().index()

      table.foreign('role_id').references('id').inTable('roles').onDelete('cascade')
      table.foreign('application_id').references('id').inTable('applications').onDelete('cascade')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
