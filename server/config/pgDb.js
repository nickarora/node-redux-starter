import knex from 'knex'
import bookshelf from 'bookshelf'
import modelBase from 'bookshelf-modelbase'
import dbConfig from '../../db.config'

const dbConnection = knex(dbConfig[process.env.NODE_ENV || 'development'])
const db = bookshelf(dbConnection)

// Resolve circular dependencies
db.plugin('registry')

// Add some nice features to bookshelf's base model
db.plugin(modelBase.pluggable)

export default db
