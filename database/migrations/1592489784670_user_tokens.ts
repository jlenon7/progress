import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UserTokens extends BaseSchema {
  protected tableName = 'user_tokens'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()

      table.uuid('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')

      table.string('name').notNullable()
      table.enum('type', ['forgot_token', 'confirmation_token'])
      table.string('token', 255).notNullable()

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
