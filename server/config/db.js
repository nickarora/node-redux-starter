/* eslint-disable no-console */
import mongoose from 'mongoose'
import uriUtil from 'mongodb-uri'

switch (process.env.NODE_ENV) {
  case 'production': {
    const mongoUri = process.env.MONGOLAB_URI
    const mongooseUri = uriUtil.formatMongoose(mongoUri)
    const options = {}
    mongoose.connect(mongooseUri, options)
    break
  }
  case 'test': {
    mongoose.connect('localhost', `${process.env.MONGO_DB_NAME}-test`)
    mongoose.set('debug', false)
    break
  }
  default: {
    mongoose.connect('localhost', `${process.env.MONGO_DB_NAME}-development`)
    mongoose.set('debug', false)
  }
}

const db = mongoose.connection

db.on('error', () => {
  console.error.bind(console, 'connection error:')
})

db.on('disconnecting', () => {
  console.log('Database', db.name, 'disconnecting.')
})

db.once('open', () => {
  console.log('Connection to', db.name, 'established.')
})

export default db
