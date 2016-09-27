import knex from 'knex'
import bookshelf from 'bookshelf'

const dbConfig = {
  client: 'pg',
  connection: process.env.DATABASE_URL || {
    host: process.env.PG_HOST,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DB,
    charset: 'utf8',
  },
}

const dbConnection = knex(dbConfig)

export default bookshelf(dbConnection)
