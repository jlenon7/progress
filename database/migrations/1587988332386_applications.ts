import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Applications extends BaseSchema {
  protected tableName = 'applications'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.string('name', 60).notNullable()
      table.string('email', 255).notNullable()
      table.string('token', 255).notNullable().unique()
      table.string('password', 180).notNullable()
      table
        .enu('status', ['pendent', 'pendent_issue', 'approved', 'reproved', 'deleted'])
        .defaultTo('pendent')
      table.timestamps(true)
      table.dateTime('deleted_at')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
