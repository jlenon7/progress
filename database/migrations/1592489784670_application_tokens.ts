import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ApplicationTokens extends BaseSchema {
  protected tableName = 'application_tokens'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()

      table.uuid('application_id').unsigned().index()
      table.foreign('application_id').references('id').inTable('applications').onDelete('CASCADE')

      table.string('name').notNullable()
      table.string('ip').nullable()
      table.enu('type', ['forgot_token', 'confirmation_token', 'api_token'])
      table.string('token', 255).notNullable()
      table.enu('status', ['created', 'expired', 'used', 'in_use']).defaultTo('created')

      /**
       * "useTz: true" utilizes timezone option in PostgreSQL and MSSQL
       */
      table.timestamp('expires_at', { useTz: true }).nullable()
      table.timestamp('created_at', { useTz: true }).notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
