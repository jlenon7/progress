export default interface IStartDatabase {
  TypeORM(): Promise<void>
  Mongoose(): Promise<void>
  Knex(): Promise<void>
}