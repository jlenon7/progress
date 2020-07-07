const dbConfig = require('./src/config/database')

module.exports = {
  type: dbConfig.default.connection,
  host: dbConfig.default.pg.connection.host,
  port: dbConfig.default.pg.connection.port,
  username: dbConfig.default.pg.connection.user,
  password: dbConfig.default.pg.connection.password,
  database: dbConfig.default.pg.connection.database,
  entities: ["./src/app/domains/**/Infra/Entities/*.ts"],
  migrations: ["./src/database/migrations/*.ts"],
  cli: {
    migrationsDir: "./src/database/migrations/*.ts"
  }
}
